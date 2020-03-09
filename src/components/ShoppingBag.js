import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {addItem} from './../redux/action_generators';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {database} from './../firebase_config';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class ShoppingBag extends React.Component {
    
constructor(props){
    super(props);
    this.state = {
      open:false,     
      name:'',
      amount:0,
      measure:'',
      id:0,
      error_text:'Field cannot be empty',
      subject:'ShoppingBag List',
      email:'',
      body:''
  };
    this.sendEmail = this.sendEmail.bind(this)    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.clearState = this.clearState.bind(this);
    this.buildBody = this.buildBody.bind(this);
}

handleAdd(){
    const item ={name:this.state.name,amount:this.state.amount,measure:this.state.measure}
    database.ref('items').push({name:this.state.name,amount:this.state.amount,measure:this.state.measure}).then((snapshot) => {
      item.id = snapshot.key;     
      this.props.dispatch(addItem(item));
      this.clearState()
  })
}

clearState(){
  event.preventDefault();
  this.setState({        
    name:'',
    amount:0,
    measure:'',
    id:0,
  })
}

handleEdit(item){ 
    this.handleOpen() 
    this.setState({        
        name:item.name,
        amount:item.amount,
        measure:item.measure,
        id:item.id
    });
}

handleOpen ()  {
  
  event.preventDefault();
    this.setState({
        open:!this.state.open
    });
};

handleSaveChanges(){
    
  event.preventDefault();
    let item = {             
        name:this.state.name,
        amount:this.state.amount,
        measure:this.state.measure,
        id:this.state.id
    }
    this.props.dispatch({type:'EDIT_ITEM',item:item})
    console.log(item)
    this.clearState()
    this.handleOpen()
}

handleDelete(id){
    const path = 'items/'+ id
    console.log('path: '+ path)
    this.props.dispatch({type:'DELETE_ITEM',id:id})
    const adaRef = database.ref(path);
adaRef.remove()
  .then(function() {
    console.log("Remove succeeded.")
    this.clearState()
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
}

handleChange(evt) {
  event.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value })
  }


handleSubmit(event) {
    event.preventDefault();
    let newitem={            
        name:this.state.name,
        amount:this.state.amount,
        measure:this.state.measure,
        id:this.state.id
    };
    this.props.dispatch(editItem(newitem));
    database.ref('items/'+this.state.id).set({newitem}).then(()=>{

      this.clearState();
    }
    )
  }

  

  sendEmail(){
    this.buildBody();
    window.open('mailto:'+this.props.email+'?subject='+this.state.subject+'&body='+this.state.body);
  }
buildBody(){
  return(
    <div>
    <table>
    <tr>
      <td>Name</td>
      <td>Amount</td>
      <td>Measure</td>
    </tr>
    {this.props.items.map(row => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.amount}</td>
                <td > {row.measure} </td>
              </tr>
            ))}
    </table>
    </div>
    // <TableContainer component={Paper}>
    //   <Table aria-label="spanning table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Name.</TableCell>
    //         <TableCell>Amount</TableCell>
    //         <TableCell>Measure</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {this.props.items.map(row => (
    //         <TableRow key={row.id}>
    //           <TableCell>{row.name}</TableCell>
    //           <TableCell>{row.amount}</TableCell>
    //           <TableCell > {row.measure} </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer> 
  )
}

render(){
        return (
            <div>
            <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Name.</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Measure</TableCell>
            <TableCell >Delete</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.items.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell >              
                <InputLabel id="demo-simple-select-label">Measure</InputLabel>
                <Select                
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={row.measure}
                  disabled
                >{this.props.measures.map(row_measure => (
                  <MenuItem key={row_measure.id} value={row_measure.name} >{row_measure.name}</MenuItem>
                ))}
                </Select>
              </TableCell>
              <TableCell><Button onClick={() => this.handleDelete(row.id)}>Delete</Button></TableCell>
              <TableCell><Button onClick={() => this.handleEdit(row)}>Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
            <div>
            <TextField
            error={!this.state.name}
                
                id={this.state.name ? "standard-basic" : "outlined-error-helper-text"}
                label="Name"
                helperText={this.state.name ? '' : this.state.error_text}
                variant="outlined"
                inputProps={this.state.name}
                onChange={this.handleChange}
                name="name"
            />
            <TextField
            error={!this.state.amount}
                
                id={this.state.amount ? "standard-basic" : "outlined-error-helper-text"}
                label="Amount"
                helperText={this.state.amount ? '' : this.state.error_text}
                variant="outlined"
                inputProps={this.state.amount}
                onChange={this.handleChange}
                name="amount"
            />
            <InputLabel id="demo-simple-select-label">Measure</InputLabel>
            <Select
            error={!this.state.measure}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.measure}
            onChange={this.handleChange}
            name="measure"
          >{this.props.measures.map(row => (
            <MenuItem key={row.id} value={row.name} >{row.name}</MenuItem>
          ))}
          </Select>
            </div>
            <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleAdd}>
            Add New
            </Button>
            <div>
      <Dialog open={this.state.open} onClose={this.handleOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
        <DialogContent>
          <TextField
          error={!this.state.name}
              
              id={this.state.name ? "standard-basic" : "outlined-error-helper-text"}
              label="Name"
              helperText={this.state.name ? '' : this.state.error_text}
              variant="outlined"
              inputProps={this.state.name}
              defaultValue={this.state.name}
              onChange={this.handleChange}
              name="name"
          />
          <TextField
          error={!this.state.amount}
              
              id={this.state.amount ? "standard-basic" : "outlined-error-helper-text"}
              label="Amount"
              helperText={this.state.amount ? '' : this.state.error_text}
              variant="outlined"
              inputProps={this.state.amount}
              defaultValue={this.state.amount}
              onChange={this.handleChange}
              name="amount"
          />
          <InputLabel id="demo-simple-select-label">Measure</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.measure}
            onChange={this.handleChange}
            name="measure"
          >{this.props.measures.map(row => (
            <MenuItem key={row.id} value={row.name} >{row.name}</MenuItem>
          ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={this.sendEmail}>Send Email</Button>
    </div>
            </div>
        );
    }
}

export default connect((state)=>{
    return{
      items:state.items,
      measures:state.measures,
      email:state.user.email
    }
}

)(ShoppingBag);