import React from 'react';
import {Text, StyleSheet, View} from 'react-native';


export default class Details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        
          repos: {}
        }
      

      }
  
    render() {
        let repo = this.props.route.params.reposit;
        let objRepo =  JSON.parse(repo);
      // console.log(objRepo.id);
      
        return(
          <View style={styles.container}>
              <Text style={styles.baseText}>Repository : {objRepo.full_name}</Text>
              <Text style={styles.baseText}>Description : {objRepo.description}</Text>
              <Text style={styles.baseText}>Forks Count : {objRepo.forks_count}</Text>
              <Text style={styles.baseText}>Open Issues Count : {objRepo.open_issues_count}</Text>
              <Text style={styles.baseText}>Default Branch : {objRepo.default_branch}</Text>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        padding: 10,
    },
   
    baseText: {
        textShadowOffset: {width: 2, height: 2},
        color: '#000',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        lineHeight: 40,
       // textAlign: 'center',
        textShadowColor: '#F5F5F5',
        textShadowRadius: 4
      },
      innerText: {
        color: 'red'
      }
  });