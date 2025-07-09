
import CardHolder from './components/CardHolder';
import Container from './components/Container';
import Title from "./components/Title"
import './App.css';
import HelpModal from './components/Helper';

function App() {
  return (
    <div className="App pokeball-border">
      <Title/>
      <Container children={<CardHolder/>}/>
      <HelpModal></HelpModal>
    </div>
  );
}

export default App;
