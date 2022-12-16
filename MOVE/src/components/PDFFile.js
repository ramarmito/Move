import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import CPElogo from "../photos/cpe_logo.png";
import TIPlogo from "../photos/tip_logo.png";
import { useDocument } from "../hooks/useDocument";

const PDFFile = ({ editSummaryId }) => {
  const { document } = useDocument("outreach-programs", editSummaryId);

  return (
    <Document>
      {document && (
        <Page style={styles.body} size="LETTER">
          <View style={styles.headerContainer}>
            <Image src={TIPlogo} style={styles.logo1} />
            <View style={styles.headerText}>
              <Text style={styles.headerBold} fixed>
                TECHNOLOGICAL INSTITUTE OF THE PHILIPPINES
              </Text>
              <Text style={styles.header} fixed>
                Quezon City
              </Text>
              <Text style={styles.headerBold} fixed>
                Computer Engineering Department
              </Text>
            </View>
            <Image src={CPElogo} style={styles.logo2} />
          </View>
          <Text style={styles.report}>After Outreach Report</Text>
          <View style={styles.box}>
            <View style={styles.row}>
              <View style={styles.normalColumn1}>
                <Text style={styles.textLabel}>Title:</Text>
              </View>
              <View style={styles.normalColumn2}>
                <Text style={styles.textContent}>
                  {document.outreachTitle && document.outreachTitle}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.normalColumn1}>
                <Text style={styles.textLabel}>Coordinator:</Text>
              </View>
              <View style={styles.normalColumn2}>
                <Text style={styles.textContent}>
                  {document.coordinator && document.coordinator}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text style={styles.textLabel}>Academic Year:</Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.textContent}>
                  {document.academicYear && document.academicYear}
                </Text>
              </View>
              <View style={styles.column3}>
                <Text style={styles.textLabel}>Semester:</Text>
              </View>
              <View style={styles.column4}>
                <Text style={styles.textContent}>
                  {document.semester && document.semester}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.normalColumn1}>
                <Text style={styles.textLabel}>Date Conducted:</Text>
              </View>
              <View style={styles.normalColumn2}>
                <Text style={styles.textContent}>
                  {document.dateConducted &&
                    document.dateConducted.toDate().toDateString()}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text style={styles.textLabel}>Type:</Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.textContent}>
                  {document.type && document.type}
                </Text>
              </View>
              <View style={styles.column3}>
                <Text style={styles.textLabel}>No. of Participants:</Text>
              </View>
              <View style={styles.column4}>
                <Text style={styles.textContent}>
                  {document.numberOfParticipants &&
                    document.numberOfParticipants}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.normalColumn1}>
                <Text style={styles.textLabel}>Beneficiary:</Text>
              </View>
              <View style={styles.normalColumn2}>
                <Text style={styles.textContent}>
                  {document.beneficiary && document.beneficiary}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.normalColumn1}>
                <Text style={styles.textLabel}>Location:</Text>
              </View>
              <View style={styles.normalColumn2}>
                <Text style={styles.textContent}>
                  {document.location && document.location}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.specialColumn}>
                <Text style={styles.textLabel}>Summary:</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.specialColumn}>
                <Text style={styles.specialContent}>
                  {document.summary && document.summary}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.specialColumn}>
                <Text style={styles.textLabel}>Outreach Photos:</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.specialColumn}>
                {/* <Text style={styles.specialContent}> */}
                {document.outreachPhotos &&
                  document.outreachPhotos.map((photo, index) => (
                    <Image style={styles.image} src={photo} key={index} />
                  ))}
                {/* </Text> */}
              </View>
            </View>
          </View>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </Page>
      )}
    </Document>
  );
};

export default PDFFile;

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  logo1: {
    width: "13%",
    marginLeft: 10,
  },
  headerText: {
    width: "74%",
  },
  logo2: {
    width: 90,
    marginRight: 5,
  },
  headerBold: {
    fontSize: 12,
    marginBottom: 2,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    color: "grey",
  },
  header: {
    fontSize: 12,
    marginBottom: 2,
    textAlign: "center",
    fontFamily: "Helvetica",
    color: "grey",
  },
  report: {
    marginTop: 30,
    marginBottom: 14,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  box: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    width: "100%",
  },
  normalColumn1: {
    borderRightWidth: 1,
    width: "20%",
  },
  normalColumn2: {
    width: "80%",
  },
  column1: {
    borderRightWidth: 1,
    width: "20%",
  },
  column2: {
    borderRightWidth: 1,
    width: "30%",
  },
  column3: {
    borderRightWidth: 1,
    width: "20%",
  },
  column4: {
    width: "30%",
  },
  specialColumn: {
    width: "100%",
  },
  specialContent: {
    margin: 4,
    fontSize: 11,
    textAlign: "justify",
    fontFamily: "Helvetica",
  },
  textLabel: {
    margin: 4,
    fontSize: 11,
    textAlign: "left",
    fontFamily: "Helvetica-Bold",
  },
  textContent: {
    margin: 4,
    fontSize: 11,
    textAlign: "justify",
    fontFamily: "Helvetica",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
