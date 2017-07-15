import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Welcome from './test';
import Listtodo from './todolist';
// import Todoaa from './test';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

/*这个页面只认一次的render*/


// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(
//     element,
//     document.getElementById('root')
//   );
// }
// setInterval(tick, 1000);

// ReactDOM.render(<Welcome name="huangyh" />, document.getElementById('root'));
ReactDOM.render(<Listtodo/>, document.getElementById('container'));