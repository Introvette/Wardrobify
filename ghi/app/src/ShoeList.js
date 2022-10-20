import React from 'react';
import { Link } from 'react-router-dom';

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
