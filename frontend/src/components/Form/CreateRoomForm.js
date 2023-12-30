const CreateRoomForm = () =>{
    return(
        <form  className="form col-md-12 mt-5">
           <div className="form-group">
                <input type="text" 
                className="form-control my-2" 
                placeholder="Enter your name" 
                />
           </div>
           <div className="form-group">
                <div className="input-group">
                    <input type="text" 
                    disabled
                    className="form-control my-2" 
                    placeholder="Generate Room Code" 
                    />
                </div>
           </div>
           <div className="input-group-append d-flex gap-1">
            <button className="btn btn-primary bt-sm" 
            type="button">
               Generate
            </button>
            <button className="btn btn-outline-danger bt-sm" 
            type="button">
               Copy
            </button>
           </div>
           <button type="submit" 
           className="mt-4 btn btn-primary btn-block form-control ">Generate Room</button>
        </form>
    )
}

export default CreateRoomForm