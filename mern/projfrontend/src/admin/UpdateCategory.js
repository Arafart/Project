import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from "../core/Base";
import {getCategory, updateCategory} from "./helper/adminapicall"


const UpadateCategory = ({match}) => {

    const [name, setName]=useState("")
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAutheticated();

    const preload = (categoryId) => {
      getCategory(categoryId).then(data => {
        //console.log(data);
        if (data && data.error) {
          setError(true);
        } else {
          setName(data.name)
        }
      });
    };

    useEffect(() => {
      preload(match.params.categoryId);
    }, []);
  

    const goBack =() => {
        return (
            <div className="mt-5">
                <Link className="btn btn-success btn-sm btn-outline-dark mb-3" to="/admin/dashboard">
                    Admin Home
                </Link>
            </div>
        )
    };

    const handleChange = event => {
            setError("");
            setName(event.target.value);        
    };
    
    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request file
        updateCategory(match.params.categoryId, user._id, token, {name} )
            .then(data => {
                if(data.error) {
                  setError(true);
                } else {
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            });
    };

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category Updated Successfully</h4>;
        }
    };
    
    const warningMessage = () => {
        if(error) {
            return <h4 className="text-danger">Failed to Update category</h4>;
        }
    };

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Update the category</p>
                <input type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For Ex. Summer"
                />
                <button onClick={onSubmit}
                className="btn btn-outline-info">Update category</button>
            </div>
        </form>
    );
    
    return (
        <Base title="Update category area"
        description="Update a category for tshirts"
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}


export default UpadateCategory;