import React, {useState} from 'react';
import './App.css';
import ResidentsList from './Components/ResidentsList';
import Search from './Components/Search';
import Error from './Components/Error';
import 'h8k-components';

const title = "Hacker Dormitory";
function App() {
    const [errorMessage, setErrorMessage] = useState("");
    const [students, updateStudents] = useState([]);

  return (
    <div className="App">
        <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search
            onError={message => setErrorMessage(message)}
            onAdd={student => {

                let newStudents = [...students];
                if (newStudents.indexOf(student) === -1) {
                    newStudents.push(student);
                    updateStudents(newStudents)
                }

                setErrorMessage("")
            }}
        />
          { errorMessage !== "" ? <Error errorMessage={errorMessage}/> : null}
        <ResidentsList students={students}/>
      </div>
    </div>
  );
}

export default App;
