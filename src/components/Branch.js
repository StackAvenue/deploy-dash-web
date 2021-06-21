import React from 'react';
import { useParams, useEffect, useState}  from 'react';



function Branch(props) {
  const [branches, setBranches] = useState([]);
    // const {id, branch} = useParams();
  

    // const [repos, setRepos] = useState(null)
    useEffect(() => {
      getBranch()
    }, [])

    const getBranch = () => {
      fetch("http://3ed64a59313e.ngrok.io/api/v1/users/branches?full_name=joshinehajoshi/Api-Integration-using-axios",
      { headers: 
        {"access_token" : `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`} }
      ).then((resp) => {
        resp.json();
        console.log("branch", resp);
      }).then((resp) => {
        console.log("respbranch",resp)
        setBranches(resp)
        // console.log("nehajj",resp.type)
        // console.log()
      }).catch((err) => console.log(err));
     }
  
  
    
  
  








    return (
        <div className="homepage">
      <div className="parent-div">
        <div className="branch-div">
          <h2>DeployDash</h2>
          <div className="user">
            <h5 className="user-name">user_name</h5>
            <div className="avatar"></div>
          </div>
        </div>
        <div className="repo-div">
          <div className="search-bar">
            <input placeholder="Enter branch name"></input>
            <button>Deploy</button>
          </div>
          <div className="branch">
            <table>
              <thead>
                <tr>
                  <th>Branch</th>
                </tr>
                <tr>
                  <th>Id</th>
                </tr>
                
                     <tr>
                     <th>Branch</th>
                   </tr>
        
               
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Branch;
