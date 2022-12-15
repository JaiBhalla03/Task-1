import React, {useState} from 'react';

const AddTodo = ({adding}) => {
    const [clicked, setClicked] = useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
        adding(e.target.userId.value, e.target.id.value, e.target.title.value, e.target.completed.value);
        e.target.userId.value = "";
        e.target.id.value = "";
        e.target.title.value = "";
        e.target.completed.value = "";
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder={'userId'} name={'userId'}/>
                <input placeholder={'id'} name={'id'}/>
                <input placeholder={'title'} name={'title'}/>
                <input placeholder={'completed'} name={'completed'}/>
                <button onSubmit={handleSubmit} className={'post_button'}>Post</button>
            </form>

        </div>
    );
};

export default AddTodo;