import React from "react";

class MovieTabs extends React.Component {

// Данный метод делает проверку пропсов или стейта на изменение и говорить реакту, что, еслил изменеий небыло, то не делай render лишний раз
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.sort_by !== this.props.sort_by) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { sort_by, updateSortBy } = this.props;
    // Функция handleClick принимает аргумент строку как value, которая возвращает ф-цию event и внутри updateSortBy(value)
    //   Ниже приведена развернутая запись
    /*const handleClick = value => {
        return (event) => {
            updateSortBy(value)
        };}
////////////////////////////////////////        
        <div onClick={event=> {
              updateSortBy("popularity.desc")
            }}>
        </div> **/

    const handleClick = (value) => () => updateSortBy(value);
    const getClassLink = (value) =>
      `nav-link ${sort_by === value ? "active" : ""} `;

    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <div
            onClick={handleClick("popularity.desc")}
            className={getClassLink("popularity.desc")}
          >
            Popularyty desc
          </div>
        </li>
        <li className="nav-item">
          <div
            onClick={handleClick("revenue.desc")}
            className={getClassLink("revenue.desc")}
          >
            Revenue desc
          </div>
        </li>
        <li className="nav-item">
          <div
            onClick={handleClick("vote_average.desc")}
            className={`nav-link ${
              sort_by === "vote_average.desc"
                ? "active"
                : "" /*Развернутое представление строкам className выше**/
            } `}
          >
            Vote avetage desc
          </div>
        </li>
      </ul>
    );
  }
}
export default MovieTabs;
