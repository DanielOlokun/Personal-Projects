// some necessary imports
// i tried grouping them for presentation reasons + made it easier when testing/trying to debug :))

// some imports
import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './components/home';
import NavBar from './components/navbar';
import AddGrade from './components/addGrade';
import Module2Cohort from './components/modules2cohort';
import './index.css';

// different "list" imports
import CohortList from './components/allCohort';
import DegreeList from './components/allDegree';
import ModuleList from './components/allModules';

// involving forming/creation imports
import FormDegree from './components/formDegree';
import FormStudent from './components/formStudent';
import FormCohort from './components/formCohort';
import FormModule from './components/formModule';


// the "single" imports
import SingleCohort from './components/single_cohort';
import SingleDegree from './components/single_degree';
import SingleModule from './components/single_module';
import SingleStudent from './components/single_student';

function App() {
  return (
    <div className="App">
    <NavBar />         
    <header className="App-header">                 {/* routes that allow for different webpages to be accessed by navbar */}
    <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="degreelist" element={ <DegreeList/> } />
        <Route path="test" element={ <NavBar/> } />
        <Route path="modulelist" element={ <ModuleList/> } />
        <Route path="addgrade" element={ <AddGrade /> } />
        <Route path="formdegree" element={ <FormDegree /> } />
        <Route path="cohortlist" element={ <CohortList/> } />
        <Route path="formstudent" element={ <FormStudent /> } />
        <Route path="formcohort" element={ <FormCohort /> } />
        <Route path="formmodule" element={ <FormModule /> } />
        <Route path="modules2cohort" element={ <Module2Cohort /> } />
        <Route path="single_cohort" element={ <SingleCohort/> } />
        <Route path="single_degree" element={ <SingleDegree/> } />
        <Route path="single_module" element={ <SingleModule /> } />
        <Route path="single_student" element={ <SingleStudent /> } />
      
    
    </Routes>
    </header>

    </div>
  );
}

export default App;

// https://www.freecodecamp.org/news/how-to-use-react-router-version-6/
// -->> helped me with the use react routers correctly