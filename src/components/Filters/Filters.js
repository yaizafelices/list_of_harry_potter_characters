import FilterByCharacter from "./FilterByCharacter";
import FilterByHouse from "./FilterByHouse";
import FilterByGender from "./FilterByGender";
import FilterByStudents from "./FilterByStudents";
import Reset from "../Reset";
import '../../styles/Filters.scss';

const Filters=(props)=>{
    const handleSubmit = (event) => {
        event.preventDefault();
      };
    return(
        <form className="form" onSubmit={handleSubmit}>
            <FilterByCharacter
                handleFilterByCharacter={props.handleFilterByCharacter}
                filterByCharacter={props.filterByCharacter}
            />
            <FilterByHouse
                handleFilterByHouse={props.handleFilterByHouse}
                filterByHouse={props.filterByHouse}
            />
            <FilterByGender
                handleFilterByGender={props.handleFilterByGender}
                filterByGender={props.filterByGender}
            />
            <FilterByStudents
                handleFilterByStudent={props.handleFilterByStudent}
                filterBystudent={props.filterBystudent}
            />
            <Reset
                handleFilterByCharacter={props.handleFilterByCharacter} 
                handleFilterByHouse={props.handleFilterByHouse}
                handleFilterByGender={props.handleFilterByGender}
            />
        </form>

    )
}
export default Filters;