//to create an outer container
let container = document.createElement("div");
container.setAttribute("class", "container-fluid");
document.body.append(container);

//to create a parent element for title
let title_desc = document.createElement("div");
title_desc.setAttribute("class", "title_desc");
container.append(title_desc);

//to create the title
let title = document.createElement("h4");
title.innerHTML = "Search the details of Brewery Companies based on the state";
title.setAttribute("id", "title");
title_desc.append(title);

//to append all the dropdown items inside a div
let data_container_lg = document.createElement("div");
data_container_lg.setAttribute("class", "container_lg");
data_container_lg.innerHTML = `<div class="input-group d-flex justify-content-center  ">
<select
  class="custom-select col-md-5 col-sm-3 col-lg-5 "
  id="input_text"
  aria-label="Example select with button addon"
>
  <option selected>Select State....</option>
  <option class="list" value="New york">New york</option>
  <option class="list" value="Washington">Washington</option>
  <option class="list" value="California">California</option>
  <option class="list" value="Indiana">Indiana</option>
  <option class="list" value="Oregon">Oregon</option>
  <option class="list" value="Idaho">Idaho</option>
  <option class="list" value="Colorado">Colorado</option>
  <option class="list" value="Nevada">Nevada</option>
  <option class="list" value="Arizona">Arizona</option>
  <option class="list" value="Minnesota">Minnesota</option>
  <option class="list" value="Massachusetts">Massachusetts</option>
  <option class="list" value="Texas">Texas</option>
</select>
<div class="input-group-append">
  <button
    class="btn btn-primary "
    type="button"
    id="search_button"
  >
    Search
  </button>
</div>
</div>`;
container.append(data_container_lg);

//to display the brewery data
let data_area = document.createElement("div");
data_area.setAttribute("class", "data_container");
container.append(data_area);

//to get the elements of the html
let search_button = document.querySelector("#search_button");
var data_field = document.querySelector(".data_container");
let list = document.querySelector("#input_text");

//created an event for search button
search_button.addEventListener("click", () => {
  let Breweries = async () => {
    try {
      let api = `https://api.openbrewerydb.org/breweries?by_state=${list.value}`;

      console.log(api);
      let res = fetch(api, {
        method: "GET",
      });

      let data = await res;
      console.log(data);
      let data_json = await data.json();
      console.log(data_json);

      //to get the breweries details
      data_field.innerHTML = "";
      for (let i = 0; i < data_json.length; i++) {
        var name = data_json[i].name;
        var type = data_json[i].brewery_type;
        var website = data_json[i].website_url;
        var address = data_json[i].country;
        var state = data_json[i].state;
        var phone = data_json[i].phone;
        console.log(name);
        console.log(type);
        console.log(website);
        console.log(address);
        console.log(phone);

        let content = `<div class="card m-2" style="width: 20rem; height:18em">
               <div class="card-body">
                   <h5 class="card-title ">Name: ${name}</h5>
                  <h6 class="card-text "><b>Type</b>: ${type}</h6>
                   <h6 class="card-text "><b>Website</b>: ${website}</h6>
                   <h6 class="card-text "><b>Country</b>: ${address}</h6>
                   <h6 class="card-text "><b>State</b>: ${state}</h6>
                   <h6 class="card-text "><b>Phone</b>: ${phone}</h6>
               </div>
               </div>`;

        //to append the data in the document
        let details = document.createElement("div");
        details.innerHTML = content;
        data_field.append(details);
      }
    } catch (err) {
      //to alert when there is an error
      window.alert("An error occurred :(");
      console.log(err);
    }
  };
  Breweries();
});
