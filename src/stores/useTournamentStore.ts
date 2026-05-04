import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import type { StateCreator, StoreMutatorIdentifier } from "zustand"
import zukeeper from "zukeeper"

type State = {
    tournamentId: string | null,
    checked: string[],
}

type Action = {
    setTournamentId: (_tournamentId: State["tournamentId"]) => void,
    setChecked: (func: (_checked: State["checked"]) => State["checked"]) => void
}

type StateWithAction = State & Action

const createTournamentSlice: StateCreator<StateWithAction, [], []> = (set) => ({
    tournamentId: null,
    checked: [],
    setTournamentId: (_tournamentId : State["tournamentId"]) => set(() => ({ tournamentId: _tournamentId })),
    setChecked: (func: ((_checked: State["checked"]) => State["checked"])) => set((state) => ({ checked: [...func(state.checked)] })
)})

type ZukeeperTS = <
    T extends State,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
    f: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>

type ZukeeperTSImplType = <T extends State>(
    f: StateCreator<T, [], []>,
) => StateCreator<T, [], []>

const zukeeperTs: ZukeeperTSImplType = (...a) => {
    return zukeeper(...a)
}

export const zukeeperTsLogger = zukeeperTs as unknown as ZukeeperTS

const useTournamentStore = create<StateWithAction>()(
    immer(
        zukeeperTsLogger((...a) => ({
            ...createTournamentSlice(...a),
        })),
    ),
)

declare global {
    interface Window {
        store: any
    }
}

window.store = useTournamentStore

export default useTournamentStore;