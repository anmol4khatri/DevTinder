const UserCard = ({user}) => {

    const {firstName, lastName, age, gender, about, photoUrl} = user;

    return (
        <div className="flex justify-center">
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoUrl}
                        alt="profile" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName} {lastName}</h2>
                    <p>{age}, {gender}</p>
                    <p>{about}</p>
                    <div className="card-actions flex flex-col mt-3 ">
                        <button className="btn btn-primary w-1/1 mb-0.5">Ignore</button>
                        <button className="btn btn-secondary w-1/1">Intrested</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;