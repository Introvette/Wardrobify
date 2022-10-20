
import React from 'react';
import { Link } from 'react-router-dom';


async function DeleteShoe(id) {
    const url = `http://localhost:8080/api/shoes/${id}/`
    const fetchConfig = {
        method: "DELETE",
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
        window.location.reload(false)
    } else {
        console.error(response);
    }
}

function ShoeColumn(props) {
    return (
        <div className="col">
            {props.list.map(data => {
                const shoe = data;
                return (
                    <div key={shoe.id} className="card mb-3 shadow">
                        {/* <img src={shoe.picture} className="card-img-top" /> */}
                        <div className="card-body">
                            <h5 className="card-title">{shoe.manufacturer} {shoe.model_name} {shoe.model_color} shoe</h5>
                            <p className="card-text">
                                Located in: {shoe.bin.closet_name} closet on shelf #{shoe.bin.bin_number} in section #{shoe.bin.bin_size}
                            </p>
                            <button type="button" className="btn btn-outline-danger mx-3" onClick={() => DeleteShoe(shoe.id)}>Delete</button>
                            <button type="button" className="btn btn-outline-primary" onClick={(e) => {
                                e.preventDefault();
                                window.location.href = shoe.picture_url;
                            }}
                            >See Image</button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

class ShoesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shoeColumns: [[], [], []],
        };
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/shoes/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();

                const requests = []

                for (let shoe of data.shoes) {
                    const detailUrl = `http://localhost:8080/api/shoes/${shoe.id}/`
                    requests.push(fetch(detailUrl));
                }

                const responses = await Promise.all(requests);

                const shoeColumns = [[], [], []];

                let i = 0
                for (const shoeResponse of responses) {
                    if (shoeResponse.ok) {
                        const details = await shoeResponse.json();
                        shoeColumns[i].push(details);
                        i = i + 1;
                        if (i > 2) {
                            i = 0;
                        }
                    } else {
                        console.error(shoeResponse)
                    }
                }
                this.setState({ shoeColumns: shoeColumns })
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center pt-2">
                    <h2>Shoe List</h2>
                </div>
                <div className="d-flex justify-content-center pb-4">
                    <Link to="/shoes/new" className="btn btn-outline-primary d-flex justify-content-center">Create New Shoe!</Link>
                </div>
                <div className="row">
                    {this.state.shoeColumns.map((shoeList, index) => {
                        return (
                            <ShoeColumn key={index} list={shoeList} />
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default ShoesList;
