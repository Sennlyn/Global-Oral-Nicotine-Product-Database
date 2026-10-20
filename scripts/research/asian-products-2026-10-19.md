# 国家分类与亚洲产品研究（2026-10-19）

## 本轮范围与归属口径

- 国家分类的粒度是品牌；先查看品牌研发起源或相关运营主体的资料，逐品牌保存归属依据。
- 产品生产地、曾有销售记录的地区与当前销售许可分别保存，不用于代填品牌所属国。
- 俄罗斯历史记录同时可在亚洲、欧洲区域找到，全站国家总数只计一次。历史归属不推定当今商标持有人。
- 缺少归属依据的品牌进入“所属国家／地区待确认”；不把在孟买购买到的所有品牌自动标为印度。
- 保留全部747条原有产品规格，仅删除旧市场分类的展示组件，旧URL转入国家分类。

## 新增16个历史规格

| 品牌归属 | 品牌 | 数量 | 核实资料 | 图片处理 |
|---|---|---:|---|---|
| 日本 | Zerostyle Snus | 8 | [JT业务报告](https://www.jti.co.jp/investors/others/12g3_2/pdf/20151228_E1.pdf)、[JT旧目录](https://www.jt.com/media/news/2021/pdf/20210730_14.pdf)、[财务省2023价格记录](https://www.mof.go.jp/policy/tab_salt/topics/20230801_kouriteika.pdf)、[逐款零售档案](https://hamakiyasan.easy-myshop.jp/c-item-list?category_id=7) | 6张口味及Lights/Medium/Strong标签相符的照片；Spice Strong与Deep Menthol Strong页面使用旧标签图，故不展示为规格图 |
| 俄罗斯（历史） | Corvus | 4 | [A56-22873/2020裁判文本转载](https://sudact.ru/arbitral/doc/gpw4uoJvApNF/)、[Extreme标签裁判记录](https://sudact.ru/arbitral/doc/2HHr4uKSfI1u/)及逐款形态来源 | 尚无可确认对应历史规格的照片，使用缺图占位，不移用当前包装 |
| 俄罗斯（历史） | Snussbor | 2 | 同一裁判记录中的Raspberry (Portion)和Raspberry Dry cool (Portion) | 缺图占位 |
| 韩国 | Nicostop口香糖 | 1 | [Handok 2013公告](https://www.handok.co.kr/board/pressView?idx=2915)、[三养产品册](https://www.cphi-online.com/46/resourcefile/10/87/61/SYB_Pharma_Spread_Low_2019.pdf.pdf)、[韩国历史药品清单](https://dams.pa.go.kr/dams/DOCUMENT/2024/10/30/DOC/SRC/0A04202410301451454111973013961.pdf) | 韩国呼吸医学讲义第18页原始嵌入照片，框选Nicostop盒与泡罩；不改动包装 |
| 韩国 | Nicorak口腔膜 | 1 | 韩国呼吸医学讲义第8页、[MFDS品目201601546转载](https://doumdoc.com/User_inform/inform_drug_detail/du01_pk/55558) | 缺图占位 |

具体逐规格来源、图片URL、日期、字段和不确定性均保存在`src/data/asian-products.ts`。

### 数值边界

- Zerostyle的Lights、Medium、Strong仅作为定性强度，不虚构mg/袋。仅Rich Strong、Apple Mint Strong从2023财务省记录录入净重8.1g、制造国瑞典；其他品种不套用。
- 旧目录仅为历史背景，不将2021年的Regular/Apple Mint等名称视作后期Rich/Light等规格的同义词，也不据此复制净重。
- 俄罗斯裁判清单中的270、288等是卢布价格，不是尼古丁毫克数；零售来源的剂量和袋数相互矛盾，留作待核实。
- Nicostop每片2mg、每盒32片来自2013公告；64mg是标称整盒计算总量，不是吸收量。配方形态nicotine polacrilex由韩国医学讲义支持。
- Nicorak转载记录给出每片2.5mg、82.5mg片重、24×36mm、104μm厚；104μm转换为0.104mm。2021年3月17日许可有效期届满取消来自转载记录，MFDS原站本轮无法直接读取；不将该市场事件认定为全球停产。
- 历史价格批准、司法执法与药品存档均不能证明当前可合法销售，新增记录上市状态仍为待上市，生命周期为未知并保留历史背景。

## 补充原有品牌归属

Chaini Khaini按品牌公司介绍及印度税务裁判资料归入印度；Miraj按科研论文及Vital Strategies集团总部记录归入印度；Pan Bahar按DJ集团品牌沿革及新德里总部资料归入印度。只补充品牌归属，不改写各产品制造国、配方或销售许可。

## 本轮未直接作为新增产品的线索

- **韩国ZZU**：[官网目录](https://www.zzu.life/category/%EC%A0%84%EC%B2%B4-%EC%83%81%ED%92%88/28/)的四款Mint/Blueberry名称含“무니코틴”（无尼古丁），同时列6mg/8mg；旧介绍又称含尼古丁。两类文字冲突，需品牌说明或历史包装核实，暂不当作已确认含尼古丁产品收录。
- **韩国PAUSE/POSE**：[零售商文章](https://strongvapor.tistory.com/m/233)对品牌拼写也不一致，生产及品牌主体待查。
- **俄罗斯Nicktech**：裁判清单列Melon Slim、Strong、Extremely Strong、Trotyl、Orange Slim、Citrus Mix、Energy Slim、Orange、Barberry。Melon Slim被重复列价，去重为一项；尚未逐款确定形态及照片，因此保留候选。Oxy 6/9/12不能仅凭名称当作剂量，Kasta Original/Mint也需核对实际口用形态。
- **其他日本旧款**：JT2021目录包含Matcha Latte、Ume、Regular、Apple Mint、Vanilla、Cool Mint、Spice、Black Menthol及Berry/Lemon Mint Lights/Medium，需核对更名与包装年代后再并入，避免重复。
- **Zerostyle Stix/Mint吸入式烟草**、透皮贴剂、普通口香糖、无尼古丁袋未收录。

## 可复查检查

`node scripts/audit-country-classification.cjs`比较Git基线与当前ID，检查品牌及国家汇总、归属筛选、欧亚去重、HUABAO销售地未由品牌国推断、照片匹配、Nicorak厚度换算。另运行TypeScript、ESLint、生产构建与桌面/手机页面检查。本轮仅本地修改，未推送GitHub。
