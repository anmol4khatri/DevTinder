const UserCard = () => {
    return (
        <div className="flex justify-center">
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Card Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
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