
import React from 'react';
import { ReactFormGenerator, ElementStore } from 'react-form-builder2';
import { get, post } from '../components/requests';


export default class DisplayForm extends React.Component {

  constructor(props) {
    super(props);
    // console.log(`Demobar: `, props);
    this.state = {
      postUrl : '/api/form',
      datas : [],
      data: props.data,
      //answers: [props.answers],
      answers : [],
      previewVisible: props.previewVisible,
    };

    const url = '/api/formdata';
    const saveUrl = '/api/formdata';
    this.submit = this.onSubmit.bind(this);
    const update = this.onChange.bind(this);
    ElementStore.subscribe(state => update(state.datas));
  }

  showPreview() {
    this.setState({
      previewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
    });
  }
  onChange(datas) {
    this.setState({
      datas,
    });
  }

  onSubmit(datas) {
  
    const { postUrl} = this.state;
    console.log('onSubmit', datas);
    // Place code to post json data to server here
    post(postUrl, datas).then(x => {
    window.location.href = '/confirmation';
     
    });
    return false;
  }
  render() {
  //  const {  answers,data } = this.state;

    let modalClass = 'modal';
    if (this.state.previewVisible) {
      modalClass += ' show d-block';
    }

    return (
      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
   {/*     <h4 className="float-left">Preview</h4>
        <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={this.showPreview.bind(this)}>Read Only Form</button> */}
        { this.state.previewVisible &&
        <div className={modalClass}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <ReactFormGenerator
                    download_path=""
                    back_action="/"
                    back_name="Back"
                   // answer_data={answers}
                   answer_data={{}}
                    action_name="Save"
                    form_action={"/index"}
                    form_method="POST"
                   // read_only={false}
                    variables={this.props.variables}
                    onSubmit={this.submit}
                   // hide_actions={false}
                  //  data={data}
                  
                  data={this.state.data}
                  
                  datas={this.state.datas}
                  />
                
                  
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
              </div>
            </div>
          </div>
        </div> }
      </div>
    );
  }
}

// eslint-disable-next-line func-names

DisplayForm.getInitialProps = async function ({ req }) {
  const hostUrl = `${req.protocol}://${req.headers.host}`;
  const url = `${hostUrl}/api/formdata`;
  const getUrl = `${hostUrl}/api/form`;
  const answers = await get(getUrl);
  const data = await get(url);
  return {
    data,
    answers,
    previewVisible: true,
  };
};


