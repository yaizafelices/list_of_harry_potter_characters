const FilterStudent = (props) => {

    const handleFilterByStudent = (event) => {
        props.handleFilterByStudent(event.target.checked)
    }
    return (
        <fieldset>
            <label htmlFor="student">               Student</label>
            <input
            id="student"
            type="checkbox"
            checked={props.filterBystudent}
            onChange={handleFilterByStudent}
            className="student">
 
            </input>
        </fieldset>
    );



}
export default FilterStudent;