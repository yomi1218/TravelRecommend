// 検索ボタンがクリックされたときに呼び出される関数
function search() {
    // 入力フィールドからキーワードを取得し、小文字に変換
    const keyword = document.getElementById('search-bar').value.toLowerCase();

    // fetch APIを使用してJSONファイルからデータを取得
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // 検索結果を格納する配列
            let results = [];

            // 特定のキーワードに基づいてデータを取得
            if (keyword === 'country' || keyword === 'countries') {
                data.countries.forEach(country => {
                    results.push({
                        type: 'Country',
                        name: country.name,
                        imageUrl: '' // 国全体の画像URLがないため空文字
                    });
                    country.cities.forEach(city => {
                        results.push({
                            type: 'City',
                            name: city.name,
                            description: city.description,
                            imageUrl: city.imageUrl
                        });
                    });
                });
            } else if (keyword === 'beach' || keyword === 'beaches') {
                data.beaches.forEach(beach => {
                    results.push({
                        type: 'Beach',
                        name: beach.name,
                        description: beach.description,
                        imageUrl: beach.imageUrl
                    });
                });
            } else if (keyword === 'temple' || keyword === 'temples') {
                data.temples.forEach(temple => {
                    results.push({
                        type: 'Temple',
                        name: temple.name,
                        description: temple.description,
                        imageUrl: temple.imageUrl
                    });
                });
            } else {
                // 国と都市を検索
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(keyword)) {
                        results.push({
                            type: 'Country',
                            name: country.name,
                            imageUrl: '' // 国全体の画像URLがないため空文字
                        });
                    }
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(keyword)) {
                            results.push({
                                type: 'City',
                                name: city.name,
                                description: city.description,
                                imageUrl: city.imageUrl
                            });
                        }
                    });
                });

                // 寺院を検索
                data.temples.forEach(temple => {
                    if (temple.name.toLowerCase().includes(keyword)) {
                        results.push({
                            type: 'Temple',
                            name: temple.name,
                            description: temple.description,
                            imageUrl: temple.imageUrl
                        });
                    }
                });

                // ビーチを検索
                data.beaches.forEach(beach => {
                    if (beach.name.toLowerCase().includes(keyword)) {
                        results.push({
                            type: 'Beach',
                            name: beach.name,
                            description: beach.description,
                            imageUrl: beach.imageUrl
                        });
                    }
                });
            }

            // 結果をコンソールに出力
            console.log(results);

            // 結果を表示する
            displayResults(results);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
}

// 検索結果を表示する関数
function displayResults(results) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // 前回の結果をクリア

    if (results.length === 0) {
        recommendationsDiv.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            const resultTitle = document.createElement('h2');
            resultTitle.textContent = `${result.type}: ${result.name}`;
            resultItem.appendChild(resultTitle);

            if (result.description) {
                const resultDescription = document.createElement('p');
                resultDescription.textContent = result.description;
                resultItem.appendChild(resultDescription);
            }

            if (result.imageUrl) {
                const resultImage = document.createElement('img');
                resultImage.src = result.imageUrl;
                resultImage.alt = result.name;
                resultImage.className = 'result-image';
                resultItem.appendChild(resultImage);
            }

            recommendationsDiv.appendChild(resultItem);
        });
    }
}

// クリアボタンがクリックされたときに呼び出される関数
function clearResults() {
    document.getElementById('search-bar').value = '';
    document.getElementById('recommendations').innerHTML = '';
}
