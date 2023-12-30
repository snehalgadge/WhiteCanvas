import CreateRoomForm from "./CreateRoomForm"
import JoinRoomForm from "./JoinRoomForm"


const Forms = () =>{
    return(
        <div className="row h-100 pt-5">
         <div className="form-box 
          col-md-4 mt-5 border rounded-2 d-flex align-items-center
          flex-column mx-auto  p-5 border-primary">
          <h1 className="text-primary fw-bold">Create Room </h1>
          <CreateRoomForm />
         </div>
         <div className="form-box 
           col-md-4 mt-5 border rounded-2 d-flex  align-items-center
           flex-column mx-auto p-5 border-primary">
          <h1 className="text-primary fw-bold">Join Room</h1>
          <JoinRoomForm />
         </div>
        </div>
    )
}

export default Forms