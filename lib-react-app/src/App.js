//import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Entry from './Entry';
import Layout from './Layout';
import Receptionist from './Receptionist';
import HealthRecordStaff from './HealthRecordStaff';
import Physician from './Physician';
import StoreKeeper from './StoreKeeper';
import Administrator from './Administrator';
import AddPatient from './AddPatient';
import AddStaff from './AddStaff';
import AddStock from './AddStock';
import AddSupplier from './AddSupplier';
import DataLoading from './DataLoading';
import FileUpload from './FileUpload';
import PatientRecord from './PatientRecord';
import MakeReport from './MakeReport';
import BookAppointment from './BookAppointment';
import FindStaff from './FindStaff';
import FindSupplier from './FindSupplier';
import CreateStock from './CreateStock';
import SetSupplier from './SetSupplier';
import ReqItems from './ReqItems';
import StaffRecord from './StaffRecord';
import SupplierRecord from './SupplierRecord';
import LandingPage from './LandingPage';
import Reload from './Reload';

function App() {
  let appointmentList = [{ 'firstName': 'John', 'lastName': 'Sam', 'appointmentId': 34, 'patientId': 'ydh' },
  { 'firstName': 'John', 'lastName': 'Paul', 'appointmentId': 56, 'patientId': 'ydh' }];

  let data = [{ 'patientId': 'hhdjj', 'firstName': 'John', 'lastName': 'Sam' },
  { 'patientId': 'hhhjhdjj', 'firstName': 'John', 'lastName': 'Paul' }];

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='login' element={<Login />} />
          {/* <Route index element={<Entry />} /> */}
          <Route index element={<LandingPage />} />
          <Route path='landing' element={<LandingPage />} />
          <Route path='reload' element={<Entry />} />
          <Route path='home' element={<Reload />} />
          <Route path='storeKeeper' element={<StoreKeeper />} />
          <Route path='administrator' element={<Administrator />} />
          <Route path='physician' element={<Physician appointments={appointmentList} staffId='hfhf' />} />
          <Route path='receptionist' element={<Receptionist appointments={data} />} />
          <Route path='patientRecord' element={<PatientRecord appointmentId bioData medicalRecord />} />
          <Route path='makeReport' element={<MakeReport appointmentId />} />
          <Route path='bookAppointment' element={<BookAppointment />} />
          <Route path='addPatient' element={<AddPatient />} />
          <Route path='addStaff' element={<AddStaff />} />
          <Route path='addSupplier' element={<AddSupplier />} />
          <Route path='addStock' element={<AddStock />} />
          <Route path='findStaff' element={<FindStaff />} />
          <Route path='findSupplier' element={<FindSupplier />} />
          <Route path='createStock' element={<CreateStock />} />
          <Route path='setSupplier' element={<SetSupplier />} />
          <Route path='reqItems' element={<ReqItems reqItems />} />
          <Route path='staffRecord' element={<StaffRecord record />} />
          <Route path='supplierRecord' element={<SupplierRecord record />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
