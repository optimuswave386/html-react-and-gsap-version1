import React, {Component} from 'react';
import axios from 'axios';

class QuoteCard_formatted extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    }
    async componentDidMount() {
      try {
        const response = await axios.get('http://localhost:3000/randomquote'); //array
        //const response = await axios.get('http://localhost:3000/get-quote'); //not an array
        //console.log('Fetched data in DataFetcher:', response.data);
        this.setState({ data: response.data[0] });
        //console.log(`Quote is: ${response.data._id}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    render() {
      return (
        <>
            {/* <div>
            <h1>Fetched Data:</h1>
            <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
            <pre>Quote ID: {this.state.data ? this.state.data._id : 'Loading...'}</pre>
            </div> */}
            <QuoteCard 
                id={this.state.data ? this.state.data._id : '0'} 
                message={this.state.data ? this.state.data.message : 'Unknown Message'} 
                author={this.state.data ? this.state.data.author : 'Unknown Author'} 
                context={this.state.data ? this.state.data.context : 'Unknown Context'}> 
                <br />
                {/* <small>This quote was fetched from MongoDB using an Express.js backend!</small> */}
            </QuoteCard>
        </>
      );
    }
  };

class QuoteCard extends React.Component {
  render() {
    return (
      <>
        <div className="card bg-light" style={{zIndex:0, display: "inline", boxSizing: "content-box"}}>
          <div className="card-header bg-dark text-white w-100 px-2 py-2">
              Quote{/* ({this.props.id}) */}
          </div>
          <div className="card-body">
              <blockquote className="blockquote mb-0">
              <p className="fs-3 mb-3">{this.props.message}</p>
              <footer className="blockquote-footer" style={{borderRight: "0px transparent"}}>{this.props.author} <cite title="Source Title">{this.props.context}</cite></footer>
              </blockquote>
              {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default QuoteCard_formatted;