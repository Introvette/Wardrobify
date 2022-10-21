
import React from 'react';

async function Delete(id){
    const url = "http://localhost:8080/api/shoes/" + id;
    const fetchConfig = {
        method: "DELETE",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        window.location.reload(false);
    }
}
class ShoesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shoes: []
        };
    }
    async componentDidMount() {
        const url = 'http://localhost:8080/api/shoes/';
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({ shoes: data });
            console.log(data.shoes)
        }
    }
    render() {
            return (
                <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Shoes</th>
                            <th>Shoe manufacturer</th>

                        </tr>
                    </thead>
                        <tbody>
                            {this.state.shoes.map(shoe => {
                                return (
                                <tr key={shoe.href}>
                                    <td>{shoe.model_name}</td>
                                    <td>{shoe.color}</td>
                                    <td><button onClick={() => Delete(shoe.id)}>Delete</button></td>
                                </tr>
                            )})}
                        </tbody>
                </table>
                </div>
            )
    }
}
export default ShoesList;
