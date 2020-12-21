import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
import Details from './Details';
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
    
      username: '',
      image:'',
      repos: [],
      name: '',
      company: '',
      location: ''
    }
   
  }
  _handleChange = (evt) => {
    this.setState({
      username: evt.nativeEvent.text
    });
  }
  _getUserDetails = (username) => {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}`;
    return fetch(url).then((res) => res.json());
  }
  _getUserRepos = (username) => {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then((res) => res.json());
  }
  _handleSubmit = () => {
    this._getUserRepos(this.state.username)
      .then((res) => {
        this.setState({repos: res});
      });
      this._getUserDetails(this.state.username)
      .then((res) => {
        this.setState({
          image: res.avatar_url,
          name: res.name,
          comapny: res.company,
          location: res.location
          
        });

      });
      
  }
  _handleRepo = (repo) => {

  }
  _renderRepos = () => {
   
    return (
      <ScrollView>
       {this.state.image != '' && <Image source={{
          uri: this.state.image
        }} style={styles.images}></Image>
      }
      {this.state.name != '' &&
        <View style={styles.subContainer}>
        <Text style={styles.text}>Name : {this.state.name}</Text>
        <Text style={styles.text}>Company : {this.state.company}</Text>
        <Text style={styles.text}>Location : {this.state.location}</Text>
        <Text style={styles.text}>Repositories : </Text>
        </View>
      }
      
        {
          this.state.repos.map((repo, i) => {
            return (
              <View style={{padding: 10}}>
              <View key={i}>
              <TouchableOpacity
          style={styles.buttonRepo}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('Details', {
            reposit : JSON.stringify(repo)
          })}>
         
       
                <Text style={styles.buttonTextRepo}>{i}, {JSON.stringify(repo.full_name)}</Text>
                </TouchableOpacity>  
              </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          placeholder="Enter your github username"
          style={styles.input}
          onChange={this._handleChange}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={this._handleSubmit}>
          <Text style={styles.buttonText}>VIEW</Text>
        </TouchableOpacity>

        { this._renderRepos() }

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    width: screenWidth - 20,
    height: 38,
    padding: 4,
    fontSize: 16,
    borderColor: '#3a3a3a',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'#263238',
    borderColor: '#263238',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonRepo: {
    height: 25,
    flexDirection: 'row',
    backgroundColor:'#263238',
    borderColor: '#263238',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
  },
  buttonTextRepo: {
    color: '#FFFFFF',
    fontSize: 14,
    alignSelf: 'center',
  },
  images: {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  subContainer: {
    flex: 1,  
  },
  text: {
    marginLeft: 30
  },
});
