export default (submittedDate) => {

    let d;

    if(submittedDate){
        d= new Date(submittedDate);
    } else {
        d = new Date();
    }
    
    const year = (d.getFullYear()).toString();
    const month = ((d.getMonth()) + 101).toString().slice(-2);
    const date = ((d.getDate()) + 100).toString().slice(-2);

    const hours = ((d.getHours()) + 100).toString().slice(-2);
    const mins = ((d.getMinutes()) + 100).toString().slice(-2);

    //Perfect for DateTime field's defaultValue
    return `${year}-${month}-${date}T${hours}:${mins}`;
}