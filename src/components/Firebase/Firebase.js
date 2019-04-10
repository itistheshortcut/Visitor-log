import app from "firebase/app";
import "firebase/firestore";
import config from "../../config";

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.firestore();

    this.visitorsRef = this.db.collection("visitors");
  }
  addVisitor = type => {
    let data = {
      type: type,
      time: app.firestore.FieldValue.serverTimestamp()
    };
    this.visitorsRef.add(data);
  };
  getVisitors = async () => {
    let snapshot = await this.visitorsRef.orderBy("time").get();
    return snapshot.docs.map(doc => doc.data());
  };
  getVisitorsToday = async () => {
    let dummy = new Date(Date.now());
    let todayDate = new Date(
      dummy.getFullYear(),
      dummy.getMonth(),
      dummy.getDate()
    );
    let snapshot = await this.visitorsRef.where("time", ">", todayDate).get();
    return snapshot.docs.length;
  };
  getVisitorsThisMonth = async () => {
    let dummy = new Date(Date.now());
    let todayDate = new Date(dummy.getFullYear(), dummy.getMonth());
    let snapshot = await this.visitorsRef.where("time", ">", todayDate).get();
    return snapshot.docs.length;
  };
  getVisitorsThisYear = async () => {
    let dummy = new Date(Date.now());
    let todayDate = new Date(dummy.getFullYear());
    let snapshot = await this.visitorsRef.where("time", ">", todayDate).get();
    return snapshot.docs.length;
  };
  getVisitorsByDay = async () => {
    let returnedObject = {
      new: {},
      regular: {}
    };
    let snapshot = await this.visitorsRef.orderBy("time").get();
    snapshot.forEach(doc => {
      let docType = doc.data().type;
      let docDate = doc.data().time.toDate();
      let docDay = `${docDate.getFullYear()}-${docDate.getMonth() +
        1}-${docDate.getDate()}`;
      if (!returnedObject.new[docDay]) {
        returnedObject.new[docDay] = 0;
      }
      if (!returnedObject.regular[docDay]) {
        returnedObject.regular[docDay] = 0;
      }
      returnedObject[docType][docDay] = returnedObject[docType][docDay] + 1;
    });
    return returnedObject;
  };
  getVisitorsByMonth = async () => {
    let returnedObject = {
      new: {},
      regular: {}
    };
    let snapshot = await this.visitorsRef.orderBy("time").get();
    snapshot.forEach(doc => {
      let docType = doc.data().type;
      let docDate = doc.data().time.toDate();
      let docDay = `${docDate.getFullYear()}-${docDate.getMonth() + 1}`;
      if (!returnedObject.new[docDay]) {
        returnedObject.new[docDay] = 0;
      }
      if (!returnedObject.regular[docDay]) {
        returnedObject.regular[docDay] = 0;
      }
      returnedObject[docType][docDay] = returnedObject[docType][docDay] + 1;
    });
    return returnedObject;
  };
  getVisitorsByYear = async () => {
    let returnedObject = {
      new: {},
      regular: {}
    };
    let snapshot = await this.visitorsRef.orderBy("time").get();
    snapshot.forEach(doc => {
      let docType = doc.data().type;
      let docDate = doc.data().time.toDate();
      let docDay = `${docDate.getFullYear()}`;
      if (!returnedObject.new[docDay]) {
        returnedObject.new[docDay] = 0;
      }
      if (!returnedObject.regular[docDay]) {
        returnedObject.regular[docDay] = 0;
      }
      returnedObject[docType][docDay] = returnedObject[docType][docDay] + 1;
    });
    return returnedObject;
  };
}
export default Firebase;
