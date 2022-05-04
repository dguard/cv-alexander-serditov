import React from "react";
import Sidebar from "./components/Sidebar";
import Button from "./components/Button";
import estates from "./config/estates.json";

function HomePage({ localEstates }) {
  const estateInsideRow = (function(){
    const rows = []
    const newLocalEstates = localEstates.slice(0)

    while(newLocalEstates.length) {
      rows.push(newLocalEstates.splice(0, 3))
    }
    return rows
  })()

  return (
    <section className="home">
      <Sidebar />
      <div className="content">

        <div className="top-row">
          <h2 className="title">Your dashboard</h2>

          <div className="top-right-controls">
            <Button className="notification-btn btn"><img src={"/icons/bell.png"} /></Button>
            <Button className="search-btn btn"><img src={"/icons/search.png"} /></Button>
          </div>
        </div>

        <div className="metrics">
          <div className="metric-small">
            <div>
              <span className="title">Today sales</span>
              <span className="metric-value">2,456</span>
            </div>
            <img src={"/today-sales.png"} />
          </div>
          <div className="metric-small">
            <div>
              <span className="title">New Products</span>
              <span className="metric-value">221</span>
            </div>
            <img src={"/new-products.png"} />
          </div>
          <div className="metric-small">
            <div>
              <span className="title">Inventory</span>
              <span className="metric-value">1,425</span>
            </div>
            <img src={"/inventory.png"} />
          </div>
        </div>

        <div className="favorites">
          <div className="favorites-panel">
            <h3 className="title">Your favorites</h3>
            <div className="search-container">
              <form action="/" method="POST">
                <div className="search-input">
                  <input id="name" placeholder="Try 'Miami beachhouse'" type="text" autoComplete="name" required/>
                  <img src={"/icons/search.png"} />
                </div>
              </form>
            </div>
          </div>

          <div className="favorites-list">
              {estateInsideRow.map((rowItems) => {
                  return <div className="favorites-list-row">
                    {rowItems.map((estate) => {
                      return (<div className="card">
                        <img src={estate.imgSrc}/>
                        <h4 className="title">{estate.title}</h4>
                        <p>{estate.description}</p>

                        <div className="details">
                          <span className="location"><img src={"/icons/room.png"}/> {estate.location} </span>
                          <span className="size"><img src={"/icons/view-carousel.png"}/> {estate.size} </span>
                          <span className="kind"><img src={"/icons/business.png"}/> {estate.kind} </span>
                        </div>

                        <div className="view-btn">
                          <span>View Listing Details</span>
                        </div>
                      </div>)
                    })
                    }
                  </div>
              })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default HomePage;

export async function getStaticProps(context) {
  const localEstates = estates;
  return {
    props: { localEstates }, // will be passed to the page component as props
  };
}