import React, {useState} from 'react';

const Trues = ()=>{
    return(
        <div style={{color: 'green'}}>Done</div>
    )
}

const Falses = ()=>{
    return(
        <div style={{color: 'red'}}>Not Done</div>
    )
}

const isDone = (completed)=>{
    if(completed){
        return <Trues/>
    }
    else{
        return <Falses/>
    }
}

const ToDo = ({userId, id, title, completed, deleting, updating}) => {
    const [clicked, setClicked] = useState(false);
    const handleDelete=()=>{
        deleting(id);
    }
    const handleClick =()=>{
        setClicked(current=> !current);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        updating(e.target.userId.value, e.target.id.value, e.target.title.value, e.target.completed.value);
        e.target.userId.value = "";
        e.target.id.value = "";
        e.target.title.value = "";
        e.target.completed.value = "";
    }

    const handleUpdate = ()=>{
        updating(id);
    }

    return (
        <div>
            <hr/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>{userId}</div>
                <div>{id}</div>
            </div>
            <div>
                {title}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {isDone(completed)}
                </div>
                <button onClick={handleDelete}>Delete Task!</button>
                <button onClick={handleUpdate}>Update Task!</button>
            </div>
            {clicked &&
                (<form onSubmit={handleSubmit}>
                <input placeholder={'userId'} name={'userId'}/>
                <input placeholder={'id'} name={'id'}/>
                <input placeholder={'title'} name={'title'}/>
                <input placeholder={'completed'} name={'completed'}/>
                <button onSubmit={handleSubmit} className={'post_button'}>Post</button>
                </form>)}
        </div>
    );
};

export default ToDo;