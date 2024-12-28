import { IPlanoMicrosoftExchange } from '@/interfaces/planoMicrosoftExchange';
import { create } from 'zustand'

type ClientAction = {
    setPlans: (plans: IPlanoMicrosoftExchange[]) => void,
}

interface TypeClientStore {
    plans: IPlanoMicrosoftExchange[];
    actions: ClientAction
}

const usePublicStoreMicrosoftExchange = create<TypeClientStore>((set) => ({
    plans: [],
    actions: {
        setPlans(plans) {
            set({plans: plans})
        }
    }
}))

export default usePublicStoreMicrosoftExchange