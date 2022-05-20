import React, {useState} from 'react';
import {useTypeSelector} from "../hooks/useTypeSelector";
import InputAutocomplete from "../components/Input/InputAutocomplete";


const AdminTab = () => {
    const tabIndex = useTypeSelector(state => state.app.tabIndex)
    const displayStyle = (tabIndex === 4) ? {} : {display: "none"}

    const inputState = useState("");

    return (
        <div style={displayStyle}>
            <h1>Admin</h1>

            <InputAutocomplete valueState={inputState} autocompleteType="nameSto"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolorem eaque eius eos excepturi, itaque maxime molestias rerum sed. Ad dolorem dolorum illum laboriosam optio porro reprehenderit voluptas? Animi consectetur distinctio fugiat ipsum perspiciatis placeat praesentium quaerat quidem quisquam, quod quos recusandae ullam voluptatum. Doloremque expedita fugit natus quam tenetur?</p>

        </div>
    );
};

export default AdminTab;