// HOOKS //
import React from "react";
import '../styles/App.scss';
import { useState, useEffect } from "react";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";
//import PropTypes from 'prop-types';

// IMAGES //
import imageDefault from '../images/imageDefault.jpg';



// SERVICES //
import getDataApi from '../services/charactersHarryPotterApi';
import ls from '../services/localStorage';

// COMPONENTS //
import Header from "./Header";
import Filters from "./Filters/Filters";
import CharacterList from "./Characters/CharacterList";
import CharacterDetail from "./Characters/CharacterDetail";
import Footer from "./Footer";


function App() {

  // STATE VARIABLES //

  const [dataCharater, setDataCharater] = useState(ls.get('dataCharacterLs',[]));
  const [filterByCharacter, setFilterByCharacter] = useState(ls.get('filterByCharacterLs',''));
  const [filterByHouse, setFilterByHouse] = useState(ls.get('filterByHouseLs','Gryffindor'));
  const [filterByGender, setFilterByGender] = useState(ls.get('filterByGenderLs','all'));
  const [filterBystudent, setFilterByStudent] = useState("all");




    // API //
    useEffect(() => {
      getDataApi().then((dataFromApi) => {
        setDataCharater(dataFromApi);
      })
    }, []);

     // LOCAL STORAGE //
     useEffect(() => {
       ls.set('dataCharactersLs', dataCharater);
       ls.set('filterByCharacterLs', filterByCharacter);
       ls.set('filterByHouseLs', filterByHouse);
       ls.set('filterByGenderLs', filterByGender);

     }, [dataCharater, filterByCharacter,filterByHouse, filterByGender]);


    // FILTER BY CHARACTER, BY HOUSE AND BY GENDER//
    const handleFilterByCharacter = (value)=>{
      setFilterByCharacter(value);
    }

    const handleFilterByHouse = (value)=>{
      setFilterByHouse(value);
    }

    const handleFilterByGender = (value) => {
      setFilterByGender(value);
    };

    const handleFilterByStudent = (value) => {
      setFilterByStudent(value);
    };




    const characterFilters = dataCharater
    .filter((character) => {
      if (filterByCharacter === "all") {
        return true;
      } else {
        return character.name.toLowerCase().includes(filterByCharacter.toLowerCase());
      }
      })
    .filter((character) => {
        if (filterByHouse === 'all') {
          return true;}
        else {return (character.house === filterByHouse);
        }
      })
      .filter((character) => {
        return filterByGender === "all" ? true : character.gender === filterByGender;})

      .filter((character) => {
        return filterBystudent === "all" ? true : character.hogwartsStudent === filterBystudent;})

        // ORDER LIST BY ALPHABETIC CHARACTERS //
      .sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
        });
    
// FUNCTION OF IMAGES IF ARE NOT FOUND//
const changeImage = (image) => {
  return image === '' ? imageDefault : image;
};

// FUNCTION FOR INPUT CHARACTER //
const getInputCharacter = () => {
  return filterByCharacter;
};

  




      // OBTAIN ID OF THE CHARACTER SELECTED //
  const { pathname } = useLocation();
  const dataPath = matchPath('/character/:id', pathname);

  const characterId = dataPath !== null ? dataPath.params.id : null;
  const characterFound = dataCharater.find((dataCharater) => { return dataCharater.id === (characterId) });




         
  
  
  return (
    <div className="completeHtml">
      <Header />
      <main>
      <Routes>
        <Route 
        path="/" 
        element={
          <>
            <Filters 
              handleFilterByCharacter={handleFilterByCharacter}
              filterByCharacter={filterByCharacter}
              handleFilterByHouse={handleFilterByHouse}
              filterByHouse={filterByHouse}
              handleFilterByGender={handleFilterByGender}
              filterByGender={filterByGender}
              handleFilterByStudent={handleFilterByStudent}
              filterBystudent ={filterBystudent}

            />
            <CharacterList 
              dataCharater={characterFilters}
              changeImage={changeImage}
              getInputCharacter={getInputCharacter()}
              characterFound={characterFound}

            />

          </>
        }/>
        <Route 
        path='/character/:id'
        element={
          <CharacterDetail
            characterFound={characterFound}
            changeImage={changeImage}
          />
          }/>
          


      </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;

