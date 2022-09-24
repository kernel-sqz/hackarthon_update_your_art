import React, { useState, useEffect } from "react";
import axios from "axios";

export const UpdateFromZacheta = () => {
  const [json, setJson] = useState([]);
  const [authors, setAuthors] = useState([]);

  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Authorization:
      "Bearer 961b1ccee4d2246878c4dae14870731bb5b1dd71e8e7c0c23651b03178a0a576e093bcdbd7bf13d35fcade0a060eb91c84b580119288ae600e94bfceb2776a6188ecb3fee689a611e76f0e75a5771026c35b80e3897b58e8e86a40b70ee4e79307ab272d4403922c30e5d2d1266b1e90db18dcdb0463d3cdc311f47b85365d27",
  };

  const getData = async () => {
    axios
      .get(
        "https://apihackaton.zacheta.art.pl/api/v1/artworks?limit=70&start=0",
        {
          headers: headersList,
        }
      )
      .then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          axios
            .get(
              `https://apihackaton.zacheta.art.pl/api/v1/artworks/${i}/Multimedia`,
              {
                headers: headersList,
              }
            )
            .then((response) => {
              axios
                .get(
                  `https://apihackaton.zacheta.art.pl/api/v1/artworks/${res.data.data[i].id}/Artists`,
                  {
                    headers: headersList,
                  }
                )
                .then((r) => {
                  for (let z = 0; z < r.data.data.length; z++) {
                    const not_0 = i === 0 ? i + 1 : i;
                    setJson((oldArr) => [
                      ...oldArr,
                      {
                        id: res.data.data[i].id,
                        link: res.data.data[i]["relationships"]["Multimedia"][
                          "links"
                        ].self,
                        date: res.data.data[i]["attributes"].Date,
                        title:
                          res.data.data[not_0]["attributes"]["Title"][0].Title,
                        url: response.data.data[0]["attributes"].FileUrl,
                        author: {
                          BirthPlace: r.data.data[0]["attributes"].BirthPlace,
                          DeathPlace: r.data.data[0]["attributes"].DeathPlace,
                          DayOfDeath: r.data.data[0]["attributes"].DayOfDeath,
                          Birthday: r.data.data[0]["attributes"].Birthday,
                          LastName: r.data.data[0]["attributes"].LastName,
                          FirstName: r.data.data[0]["attributes"].FirstName,
                        },
                      },
                    ]);
                    setAuthors((oldArr) => [
                      ...oldArr,
                      {
                        id:
                          r.data.data[0]["attributes"].FirstName +
                          "_" +
                          r.data.data[0]["attributes"].LastName,
                        author:
                          r.data.data[0]["attributes"].FirstName +
                          " " +
                          r.data.data[0]["attributes"].LastName,
                        life_span: `ur.: ${r.data.data[0]["attributes"].Birthday}, zm.: ${r.data.data[0]["attributes"].DayOfDeaths}`,
                      },
                    ]);
                  }
                });
            });
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const uniqueAuthor = Array.from(new Set(authors.map((a) => a.author))).map(
    (author) => {
      return authors.find((a) => a.author === author);
    }
  );
  uniqueAuthor.sort((a, b) => a.id - b.id);
  json.sort((a, b) => a.id - b.id);
  console.log("dupa", json);

  const addAuthorsToDB = () => {
    for (let i = 0; i < json.length; i++) {
      let authors_to_post = JSON.stringify(uniqueAuthor[i]);
      axios.post("http://localhost:8000/api/authors/", authors_to_post, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      let paintings_to_post = JSON.stringify({
        id: json[i].id,
        url: json[i].url,
        author: json[i]["author"].FirstName + "_" + json[i]["author"].LastName,
        title: json[i].title,
        description: `Data namalowania: ${json[i].date}`,
      });
      console.log("ciul", paintings_to_post);
      axios.post("http://localhost:8000/api/zacheta/", paintings_to_post, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  addAuthorsToDB();

  return <></>;
};
