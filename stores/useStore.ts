import { create } from "zustand";

type GenericObject = { [key: PropertyKey]: any };

type State = {
  users: GenericObject[];
  setUsers: (newUsers: GenericObject[]) => void;

  orders: GenericObject[];
  setOrders: (newOrders: GenericObject[]) => void;
};

const useStore = create<State>((set) => ({
  users: [],
  setUsers: (newUsers) => set(() => ({ users: newUsers })),

  orders: [],
  setOrders: (newOrders) => set(() => ({ orders: newOrders })),
}));

export default useStore;
