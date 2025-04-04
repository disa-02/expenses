import { AccountsView } from "./AccountsView";
import { SavingsView } from "./SavingsView";
import { SpacesView } from "./SpacesView";
import { Home } from "./Home";

export const LandPage = ({setSelectedItem, selectedItem}) =>{
    switch (selectedItem.type) {
        case 'Accounts':
          return <AccountsView  setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>;
        case 'Spaces':
          return <SpacesView setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>;
        case 'Savings':
          return <SavingsView selectedItem={selectedItem}/>;
        default:
          return <Home />;
    }
}