import React from 'react';

class HatsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fabric: '',
      style_name: '',
      hat_color: '',
      hat_url: '',
      locations: [],

    };
    this.handleFabricChange = this.handleFabricChange.bind(this);
    this.handleStyleNameChange = this.handleStyleNameChange.bind(this);
    this.handleHatColorChange = this.handleHatColorChange.bind(this);
    this.handleHatUrlChange = this.handleHatUrlChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  async handleSubmit(event) {
    event.preventDefault();
    let data = {...this.state};
    delete data.locations;

    const hatUrl = "http://localhost:8090/api/hats/";
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
        const hat = await response.json();

      const cleared = {
        fabric: '',
        style_name: '',
        hat_color: '',
        hat_url: '',
        location: '',
      }
        this.setState(cleared);
  }
}

    handleFabricChange(event) {
        const value = event.target.value;
        this.setState({fabric: value});
    }
    handleStyleNameChange(event) {
        const value = event.target.value;
        this.setState({style_name: value});
    }
    handleHatColorChange(event) {
        const value = event.target.value;
        this.setState({hat_color: value});
    }
    handleHatUrlChange(event) {
        const value = event.target.value;
        this.setState({hat_url: value});
    }
    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value});
    }
    async componentDidMount() {
        const url = "http://localhost:8100/api/locations/"

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({locations: data.locations});

        }

    }



  render() {
    return (
      <div className='row'>
        <div className='offset-3 col-6'>
            <div className='shadow p-4 mt-4'>
                <h1>Create a new hat</h1>
                <form onSubmit={this.handleSubmit} id='-create-hats'>
                    <div className='form-floating mb-3'>
                        <input type='text' className='form-control' id='fabric' placeholder='Fabric' value={this.state.fabric} onChange={this.handleFabricChange} />
                        <label htmlFor='fabric'>Fabric</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type='text' className='form-control' id='style_name' placeholder='Style Name' value={this.state.style_name} onChange={this.handleStyleNameChange} />
                        <label htmlFor='style_name'>Style Name</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type='text' className='form-control' id='hat_color' placeholder='Hat Color' value={this.state.hat_color} onChange={this.handleHatColorChange} />
                        <label htmlFor='hat_color'>Hat Color</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type='text' className='form-control' id='hat_url' placeholder='Hat Url' value={this.state.hat_url} onChange={this.handleHatUrlChange} />
                        <label htmlFor='hat_url'>Hat Url</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <select className='form-select' id='location' value={this.state.location} onChange={this.handleLocationChange}>
                            <option value=''>Select a Location</option>
                            {this.state.locations.map(location => {
                                return (
                                    <option key={location.id} value={location.id}>{location.closet_name} closet: shelf: {location.shelf_number} section: {location.section_number}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary'>Create</button>
                </form>
            </div>
        </div>
      </div>
    );
  }
}
  export default HatsForm
