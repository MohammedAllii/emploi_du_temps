import logo from './logo.svg';
import './App.css';

import DragNDrop from './components/DragNDrop';


const data = [
  {title: "Matiére", items: ['java','Android','ATM','Kotlin','SCRUM','NODE','REACT','SE','UI','Flutter']},
  {title: "Lundi", items: []},
  {title: "Mardi", items: []},
  {title: "Mercredi", items: []},
  {title: "Jeudi", items: []},
  {title: "Vendredi", items: []},
  {title: "Samedi", items: []}
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={data}/>
      </header>
    </div>
  );
}

export default App;
