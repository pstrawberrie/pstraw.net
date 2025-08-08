import Site from "../db/Site.js";
const buildHistoryMax = 50;

(async () => {
  try {
    const siteData = await Site.findByPk(1);

    if (!siteData) {
      console.log("> Site Data not found - new data created!");
      await Site.create({
        build_history: [new Date()],
        recent_searches: null,
        messages: null,
      });
    } else {
      console.log("-> Adding new build history entry...");

      let buildHistory = siteData.build_history;
      if (buildHistory.length > buildHistoryMax - 1) buildHistory.pop();
      buildHistory = [new Date(), ...buildHistory];
      siteData.build_history = buildHistory;
      await siteData.save();

      console.log("-> Build history updated!");
    }
  } catch (err) {
    console.error(err);
  }
})();
