import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as defaultInventoryList from "./inventory.json";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <img
          className="site-logo"
          src={
            "https://thinkbridgesoftware.com/wp-content/uploads/2017/08/tb-logo-black-1.png"
          }
          alt="logo"
        />
      </header>
      <Router>
        <Route path="/" exact>
          <List />
        </Route>
        <Route path="/inventoryitem/:itemId" exact>
          <IndividualItem />
        </Route>
      </Router>
    </div>
  );
}
const List = () => {
  const history = useHistory();
  const [inventoryList, setInventoryList] = useState(
    defaultInventoryList.default
  );
  const [addModal, setAddModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const modalOn = () => {
    setAddModal("true");
  };
  const modalOff = () => setAddModal("false");
  const [itemsList, addItems] = useState(inventoryList);
  const staticImageUrl =
    "https://images.unsplash.com/photo-1598032895397-b9472444bf93";

  const handleAddItems = (e) => {
    e.preventDefault();
    setAddModal(false);
    if (currentItem.id) {
      let itemslist = [...itemsList];
      itemslist = itemslist.map((il) => {
        if (il.id == currentItem.id) {
          il = { ...currentItem };
        }
        return { ...il };
      });
      addItems([...itemslist]);
    } else {
      addItems([...itemsList, { ...currentItem, id: itemsList.length + 1 }]);
    }
    setCurrentItem({});
  };
  return (
    <div className={`container-fluid ${addModal ? "modal-open" : ""}`}>
      <div className="row justify-content-end mr-5 mt-2 mb-2">
        <button
          class="btn btn-primary"
          onClick={() => {
            setAddModal(true);
            setCurrentItem({});
          }}
        >
          Add Item
        </button>
      </div>
      <div className={`container row`} id="wrapper">
        {itemsList?.map((il) => {
          return (
            <div
              className="col-4 pointer"
              onClick={() => {
                history.push(`/inventoryitem/${il.id}`);
              }}
            >
              <div className="card row">
                <div className="row m-0">
                  <div className="col col-12 text-right">
                    <a
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentItem(il);
                        setAddModal(true);
                      }}
                    >
                      Edit
                    </a>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col col-8 text-left">
                    <div>
                      <strong>Name:</strong>{" "}
                      <span className="ml-2">{il.name}</span>
                    </div>
                    <div>
                      <strong>Description:</strong>{" "}
                      <span className="ml-2">{il.description}</span>
                    </div>
                    <div>
                      <strong>Price:</strong>
                      <strong>{il.price}$</strong>
                    </div>
                  </div>
                  <div className="col col-4 p-1">
                    <img
                      src={il.img ? il.img : staticImageUrl}
                      className="item-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`modal ${addModal ? "in" : ""}`}
        id="myModal"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                {currentItem.id ? "Edit" : "Add"} Item to Inventory
              </h4>
              <button
                type="button"
                className="close"
                onClick={() => setAddModal(false)}
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddItems}>
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input
                    id="name"
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        [e.target.id]: e.target.value,
                      })
                    }
                    value={currentItem.name ? currentItem.name : ""}
                    type="text"
                    required
                    placeholder="Item Name"
                    className="form-control"
                  ></input>
                </div>
                <div class="form-group">
                  <label for="description">Description:</label>
                  <textarea
                    id="description"
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        [e.target.id]: e.target.value,
                      })
                    }
                    value={
                      currentItem.description ? currentItem.description : ""
                    }
                    type="text"
                    placeholder="Item Description"
                    required
                    className="form-control"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="price">Price:</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"></div>
                    <input
                      type="number"
                      id="price"
                      min={0}
                      step="any"
                      value={
                        currentItem.price ? parseFloat(currentItem.price) : ""
                      }
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          [e.target.id]: e.target.value,
                        })
                      }
                      placeholder="Item Price"
                      required
                      className="form-control"
                    ></input>
                    <div class="input-group-append">
                      <span class="input-group-text">$</span>
                    </div>
                  </div>
                </div>
                {/* <div class="form-group">
                  <label for="price">Price:</label><br></br>
                 <div className="d-flex"> <input
                    type="number"
                    id="price"
                    min={0}
                    step="any"
                    value={currentItem.price ? parseFloat(currentItem.price) : ""}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        [e.target.id]: e.target.value,
                      })
                    }
                    placeholder="Item Price"
                    required
                    className="form-control"
                  ></input>{currentItem.currenyUnit?currentItem.currenyUnit:"$"}</div>
                </div> */}
                <button type="submit" class="btn btn-primary btn-block">
                  {currentItem.id ? "Update" : "Add"} Item
                </button>
              </form>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-default" data-dismiss="modal"
                onClick={() => setAddModal("false")}
              >Close</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const IndividualItem = () => {
  const [individualItem, setIndividualItem] = useState({});
  let { itemId } = useParams();

  useEffect(() => {
    setIndividualItem(
      defaultInventoryList.default.filter((dil) => dil.id == itemId)[0]
    );
  }, []);
  return individualItem ? (
    <div>
      <div className="row m-0">
        <strong>Name:</strong>{" "}
        <span className="ml-2">{individualItem.name}</span>
      </div>
      <div className="row m-0">
        <strong>Description:</strong>{" "}
        <span className="ml-2">{individualItem.description}</span>
      </div>
      <div className="row m-0">
        <strong>Price:</strong>
        <strong>
          {individualItem.price}
          {individualItem.currenyUnit}
        </strong>
      </div>
      <div>
        <img src={individualItem.img} className="indi-img" />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default App;
