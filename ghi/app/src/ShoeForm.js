import React from 'react';

class ShoesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manufacturer: '',
            model_name: '',
            model_color: '',
            picture_url: '',
            bins: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
        this.handleChangeModelName = this.handleChangeModelName.bind(this);
        this.handleChangeModelColor = this.handleChangeModelColor.bind(this);
        this.handleChangePictureUrl = this.handleChangePictureUrl.bind(this);
        this.handleChangeBin = this.handleChangeBin.bind(this);

    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ "bins": data.bins });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.bins;

        const shoesUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(shoesUrl, fetchConfig);
        if (response.ok) {

            const cleared = {
                manufacturer: '',
                model_name: '',
                color: '',
                picture_url: '',
                bin: '',
            };
            this.setState(cleared);
        } else {
            console.error(response)
        }
    }

    handleChangeManufacturer(event) {
        const value = event.target.value;
        this.setState({ manufacturer: value });
    }

    handleChangeModelName(event) {
        const value = event.target.value;
        this.setState({ model_name: value });
    }

    handleChangeModelColor(event) {
        const value = event.target.value;
        this.setState({ model_color: value });
    }

    handleChangePictureUrl(event) {
        const value = event.target.value;
        this.setState({ picture_url: value });
    }
    handleChangeBin(event) {
        const value = event.target.value;
        this.setState({ bin: value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new shoes</h1>
                        <form onSubmit={this.handleSubmit} id="create-shoes-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeManufacturer} required placeholder="Manufacturer" type="text"
                                    id="manufacturer" name="manufacturer" className="form-control" value={this.state.manufacturer} />
                                <label htmlFor="manufacturer">Manufacturer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeModelName} required placeholder="Model Nam" type="text"
                                    id="model_name" name="model_name" className="form-control" value={this.state.model_name} />
                                <label htmlFor="model_name">Model Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeModelColor} required placeholder="Model Color" type="text"
                                    id="model_color" name="model_color" className="form-control" value={this.state.model_color} />
                                <label htmlFor="model_color">Model Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangePictureUrl} required placeholder="Picture Url" type="text"
                                    id="picture_url" name="picture_url" className="form-control" value={this.state.picture_url} />
                                <label htmlFor="picture_url">Picture Url</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChangeBin} required name="bin" id="bin" className="form-select" value={this.state.bin} >
                                    <option value="">Choose a Bins</option>
                                    {this.state.bins.map(bin => {
                                        return (
                                            <option key={bin.id} value={bin.id}>
                                                {bin.closet_name} closet - shelf: {bin.bin_number} {bin.bin_size}
                                            </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default ShoesForm;
