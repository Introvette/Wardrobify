import React from 'react';

async function Delete(id){
    const url = "http://localhost:8090/api/hats/" + id;
    const fetchConfig = {
        method: "DELETE",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        window.location.reload(false);
    }

}

class HatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hats: []
        };
    }
    async componentDidMount() {
        const url = 'http://localhost:8090/api/hats/';
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({ hats: data.hats });
            console.log(data.hats)
        }

    }

    render() {
            return (
                <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Hats</th>
                            <th>Hat color</th>
                            {/* <th>hat picture</th>
                            <th>Hat location</th> */}

                        </tr>
                    </thead>
                        <tbody>
                            {this.state.hats.map(hat => {
                                return (
                                <tr key={hat.href}>
                                    <td>{hat.style_name}</td>
                                    <td>{hat.hat_color}</td>


                                    <td><button onClick={() => Delete(hat.id)}>Delete</button></td>
                                </tr>
                            )})}
                        </tbody>
                </table>
                </div>
            )
    }
}


export default HatList;
