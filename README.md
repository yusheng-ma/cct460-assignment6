# CCT460 Assignemnt 6

kaggle: https://www.kaggle.com/datasets/iamsouravbanerjee/world-population-dataset

## important

* 100 data points X two variables
* best way of visualizing this information based on data viz principles
* limitations of the data/findings, insights and inferences from the data

limit 1: dont know how to cooperate on world map
- use lib? way too strong
- use google api way too strong
- use predefine csv

## dataset info

地理資訊：
Country/Territory：國家或領土名稱。

Capital：國家或領土的首都城市。

Continent：國家或領土所在的洲。

Area (km²)：國家或領土的總面積，單位為平方公里。

人口數據（歷史與當前）：
2022 Population：2022年的國家或領土人口。

2020 Population：2020年的國家或領土人口。

2015 Population：2015年的國家或領土人口。

2010 Population：2010年的國家或領土人口。

2000 Population：2000年的國家或領土人口。

1990 Population：1990年的國家或領土人口。

1980 Population：1980年的國家或領土人口。

1970 Population：1970年的國家或領土人口。

統計資訊：
Density (per km²)：人口密度，即每平方公里的人口數量。

Growth Rate：人口增長率，通常以百分比表示。

World Population Percentage：該國家或領土在全球人口中的百分比。

識別資訊：
Rank：根據特定數據（如人口數量或其他指標）排序的名次。

CCA3：國際標準化組織（ISO）為每個國家分配的三個字母的國家代碼。

## data visualization idea

1. 世界地圖視覺化
目的：顯示各國家或領土的地理分佈、人口數量、或人口密度等。

方法：

使用世界地圖，並根據每個國家的 2022人口數量 或 人口密度 來為地圖上的國家著色（熱圖）。顏色可以根據人口數量或密度的大小變化。

可以利用地圖標註顯示某些國家的 首都 或 排名。

2. 柱狀圖/條形圖
目的：比較不同國家的數值，比如人口增長、各年人口數量等。

方法：

柱狀圖：用來顯示每個國家的 人口數量（2022年、2000年等）或 人口增長率。

條形圖：用來對比不同國家在某一指標上的數值，像是 世界人口百分比 或 每平方公里人口密度。

3. 折線圖
目的：展示某些國家在不同年份的人口變化趨勢。

方法：

將每個國家的 不同年份人口 數據（例如1970、1980、1990等）作為 X 軸，人口數量 作為 Y 軸，繪製折線圖，展示各國人口增長或變化趨勢。

4. 圓餅圖
目的：顯示各國在 世界人口百分比 中所佔的比例。

方法：

將每個國家的 世界人口百分比 以圓餅圖的方式展示，直觀地反映出某些國家在人類總人口中的比重。

5. 散佈圖
目的：比較兩個數據點之間的關係（例如人口與面積的關係）。

方法：

用散佈圖來展示 人口密度（Y軸）和 國家面積（X軸）之間的關係，看看是否存在某些規律（例如人口密度較高的國家是否面積較小）。

6. 熱力圖
目的：顯示某些指標（如人口增長率或密度）在世界範圍內的分佈。

方法：

透過色階來表示不同國家的 人口增長率 或 人口密度，使得視覺化呈現某些區域的變化趨勢或異常值。

7. 箱型圖（Box Plot）
目的：分析各國家人口增長的分佈狀況。

方法：

用箱型圖顯示各國家在不同年份（例如，2000至2022年）的人口增長率，檢視這些數據的中位數、範圍及異常值。

8. 多重條形圖（Grouped Bar Chart）
目的：比較多個國家在不同年份（如2022、2020、2015等）的人口數量。

方法：

針對每個國家，繪製多條條形圖，並分別代表不同年份的數據，方便比較不同國家在不同年份的變化。

9. 趨勢圖/面積圖
目的：呈現一個國家或多個國家的 人口增長趨勢。

方法：

繪製每個國家人口隨著時間的增長情況，觀察長期人口增長的模式（例如：每年增長或減少的趨勢）。

10. 堆積柱狀圖（Stacked Bar Chart）
目的：將多個國家的人口數據在不同年份進行堆疊，查看人口變化的構成。

方法：

這可以用來對比不同年限的人口增長情況，或者將同一年不同國家的數據進行堆疊，展示每個國家對世界總人口的貢獻。
