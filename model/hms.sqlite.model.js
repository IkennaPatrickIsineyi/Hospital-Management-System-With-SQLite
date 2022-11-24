///model/hms.model.js
//import connection
const sql = require("./hms.sqlite.db.js");
///create tables ///
//createLogintb:staffId(fk),sessionId(pk),dateLogged,timeLogged
exports.createLogintb = (result) => {
    sql.run("create table if not exists logintb(sessionId varchar(64),\
    staffId varchar(12), dateLogged date default(current_date),\
    timeLogged time default(current_time), primary key(sessionId),\
     foreign key(staffId) references stafftb(staffId)\
    on delete cascade on update cascade)", result);
};
//createPatienttb:patientId(pk),firstName,lastName,birthday,
//dateRegistered,timeRegistered,email,phone,address,image,
//createdBy(fk)
exports.createPatienttb = (result) => {
    sql.run("create table if not exists patienttb(patientId varchar(12) primary key,\
    firstName varchar(20), lastName varchar (20), birthday date,\
    dateRegistered date default(current_date),\
    timeRegistered time default(current_time),\
    occupation varchar(30), gender varchar (1),\
    religion varchar(30), married varchar(10), email varchar(64),\
    phone varchar(15), address varchar(100), image varchar(30)\
     )", result);
};
//createStafftb:staffId,firstName,lastName,dateEmployed,
//designation,address,phone, email,birthday,image,
exports.createStafftb = (result) => {
    sql.run("create table if not exists stafftb(staffId varchar(12),\
    password varchar(100),firstName varchar(20),lastName varchar (20), birthday date,\
    dateEmployed date default(current_date), designation varchar(30),\
    email varchar(64), phone varchar(15), address varchar(100),\
    image varchar(30), primary key(staffId))",
        result);
};
//createStocktb:stockId,name,description,qty,price
exports.createStocktb = (result) => {
    sql.run("create table if not exists stocktb(stockId \
    integer primary key,name varchar(50), description \
    varchar (250),qty int default 0, price float default 0, \
   supplierId int, check(qty>=0) )", result);
};
//createAppointmenttb:appointmentId,patientId(fk),doctor(fk),
//appointmentDate, diagnosis, findings,status
exports.createAppointmenttb = (result) => {
    sql.run("create table if not exists appointmenttb(\
    appointmentId integer primary key not null, patientId varchar(12),\
    staffId varchar (12), appointmentDate date,\
    diagnosis text, findings text, status varchar(15),\
    \
    foreign key(patientId) references patienttb(patientId) \
    on delete set null on update cascade,\
    foreign key(staffId)references stafftb(staffId) on update cascade \
    on delete set null)", result);
};
//createSuppliertb:supplierId,fullName,stockId(fk),dateRegistered,timeRegistered,
//email,phone,address
exports.createSuppliertb = (result) => {
    sql.run("create table if not exists suppliertb(supplierId integer primary key,\
    fullName varchar(40),stockId int, dateRegistered date default(current_date),\
    timeRegistered time default(current_time), email varchar(64),\
    phone varchar(15), address varchar(100),\
    foreign key(stockId) references stocktb(stockId)\
    on delete cascade on update cascade)", result);
};

//createStockSuppliertb:tableId,supplierId(fk),stockId(fk)
exports.createStockSuppliertb = (result) => {
    sql.run("create table if not exists stockSuppliertb(tableId \
    integer primary key,supplierId int,stockId int,\
    foreign key(stockId) \
    references stocktb(stockId) on delete set null on update \
    cascade,foreign key(supplierId) references suppliertb(supplierId)\
    on delete set null on update cascade)", result);
};
//createPurchasetb:purchaseId,stockId(fk),supplierId(fk),datePurchased,
//qty
exports.createPurchasetb = (result) => {
    sql.run("create table if not exists purchasetb(\
    purchaseId integer primary key, stockId int,\
    supplierId int, datePurchased date,qty int,check(qty>=0),\
    foreign key(stockId) references stocktb(stockId)on delete \
    set null on update cascade,\
    foreign key(supplierId) references suppliertb(supplierId)\
    on delete set null on update cascade)", result);
};
//createAdmissiontb:admissionId,patientId(fk),staffId(fk),dateAdmitted,
//dateDischarged,healthIssue
exports.createAdmissiontb = (result) => {
    sql.run("create table if not exists admissiontb(\
    admissionId integer primary key, patientId varchar(12),\
    staffId varchar(12), dateAdmitted date default(current_date),\
    dateDischarged date, healthIssue varchar(100), \
    foreign key(patientId) references patienttb(patientId)\
    on delete cascade on update cascade,foreign key(staffId)\
    references stafftb(staffId) on delete set null on \
    update cascade)", result);
};
//createQuerytb:queryId,staffId(fk),query,reply,dateQueried,dateReplied,
//queriedBy(fk)
exports.createQuerytb = (result) => {
    sql.run("create table if not exists querytb(queryId integer,\
    staffId varchar(12), query varchar (500), reply varchar(1000),\
    dateQueried date default(current_date), dateReplied date,\
    queriedBy varchar(12),foreign key(staffId)\
    references stafftb(staffId) on update cascade on delete cascade,\
    foreign key(queriedBy) references stafftb(staffId) on\
    update cascade on delete set null)", result);
};
//createReqItemtb:reqId,stockId,appointmentId,
//qty,issued
exports.createReqItemtb = (result) => {
    sql.run("create table if not exists reqItemtb(reqId integer\
    primary key, appointmentId varchar(12), stockId int,\
    dateUsed date default(current_date),note varchar(200), timeUsed time\
    default(current_time),qty int,issued boolean default false,\
    check(qty>=0),foreign key(stockId) references stocktb(stockId)\
    on update cascade on delete set null)", result);
};

/* 
update patientAssignmenttb as t, (select s.staffId,count(a.appointmentId) \
qty from (select staffId from stafftb where designation='consultant') s \
left join appointmenttb a on s.staffId=a.staffId and a.appointmentDate=current_date \
 group by s.staffId) as p set t.qty=p.qty where t.staffId=p.staffId;
*/

//createPatientAssignmenttb:reqId,stockId,appointmentId,
//qty,issued
exports.createPatientAssignmenttb = (result) => {
    sql.run("create table if not exists patientAssignmenttb(id integer\
    primary key, staffId varchar(12), qty int,\
    check(qty>=0),foreign key(staffId) references stafftb(staffId)\
    on update cascade on delete  cascade)", result);
};

/// table triggers///
//incr_stock_qty
exports.createIncrStockQtyTrigger = (result) => {
    sql.run("create trigger if not exists incr_stock_qty\
    after insert on purchasetb for each row begin\
    update stocktb set qty=qty+new.qty where\
    stockId=new.stockId; end;", result);
};
//decr_stock_qty
exports.createDecrStockQtyTrigger = (result) => {
    sql.run("create trigger if not exists decr_stock_qty\
    after update on reqItemtb for each row begin\
    update stocktb set qty=qty-new.qty where stockId=\
    new.stockId;\
    end;", result);
};

/// table triggers///
//incr_stock_qty
exports.createMapConsultTrigger = (result) => {
    sql.run("create trigger if not exists map_consult_app\
    after insert on stafftb for each row begin\
    if new.designation='consultant' \
    insert into patientAssignmenttb(staffId,qty) values(new.staffId,0)\
    end if; end;", result);
};

//createAdmin
exports.createAdmin = (result) => {
    sql.run("insert or ignore into stafftb(staffId,password,firstName,lastName,\
    dateEmployed,designation,address,phone,email,image,\
    birthday) values ( ?,?,?,?,current_date,?,?,?,?,?,current_date)",
        ['admin', 'admin', 'admin', 'admin',
            'administrator', 'server', '99999',
            'admin@admin.admin', '9.png'], result);
    /* function (err) {
        //  const res1 = this;
        // console.log(res1); 
        if (err) {
            console.log('errooor');
            sql.all("select * from stafftb", (err, res) => {
                console.log('resii', res);
                const x = (res) => result(res, err);
                x(this);
            });
        }
        else result(err);
    }); */
};

//enableFK
exports.enableFK = (result) => {
    sql.get("pragma foreign_keys=ON", result);
    /* function (err) {
        //  const res1 = this;
        // console.log(res1); 
        if (err) {
            console.log('errooor');
            sql.all("select * from stafftb", (err, res) => {
                console.log('resii', res);
                const x = (res) => result(res, err);
                x(this);
            });
        }
        else result(err);
    }); */
};
///application queries///

//login:staffId,password,sessionId,result
exports.login = (staffId, password, designation, sessionId, result) => {
    console.log(designation);
    (designation === false) ?
        sql.run("insert into logintb(staffId,sessionId)\
    select ?,? where exists(select staffId from stafftb where\
    staffId=? and password=? )", [staffId, sessionId,
            staffId, password], result)
        :
        sql.run("insert into logintb(staffId,sessionId)\
    select ?,? where exists(select staffId from stafftb where\
    staffId=? and password=? and designation=? )", [staffId, sessionId,
            staffId, password, designation], result)


    /* (err, res) => {
        if (res.affectedRows > 0) {
            sql.query("select designation from stafftb where staffId=?",
                result);
        }
        else {
            result(err, res);
        }
    }); */
};
//logOut:staffId,sessionId,result
exports.logOut = (staffId, sessionId, result) => {
    sql.run("delete from logintb where staffId=? and\
    sessionId=?", [staffId, sessionId], result);
};
//createAccount:password,firstName,lastName,dateEmployed,
//designation,addresss,phoneNumber,image,birthday
exports.createAccount = (staffId, password, firstName, lastName, dateEmployed,
    designation, addresss, phoneNumber, email, image, birthday, result) => {
    sql.run("insert into stafftb(staffId,password,firstName,lastName,\
    dateEmployed,designation,address,phone,email,image,\
    birthday) values ( ?,?,?,?,?,?,?,?,?,?,?)", [staffId, password, firstName, lastName,
        dateEmployed, designation, addresss, phoneNumber, email, image,
        birthday], result);
};
//addPatient:firstName,lastName,birthday,email, phone,address,
//image,createdBy
exports.addPatient = (patientId, firstName, lastName, birthday,
    email, phone, address, occupation, religion, married, gender, image, result) => {
    sql.run("insert into patienttb(patientId,firstName,lastName,birthday,\
    email, phone,address,occupation,religion,married,gender,\
    image) values ( ?,?,?,?,?,?,?,?,?,?,?,?)", [patientId, firstName,
        lastName, birthday, email, phone, address, occupation,
        religion, married, gender, image], result);
};
//admitPatient:patientId,admittedBy,healthIssue
exports.admitPatient = (patientId, admittedBy, healthIssue,
    result) => {
    sql.run("insert into admissiontb(patientId,staffId,\
    healthIssue) values ( ?,?,?)", [patientId, admittedBy,
        healthIssue], result);
};
//dischargePatient:admissionId
exports.dischargePatient = (admissionId, result) => {
    sql.run("update admissiontb set \
    dateDischarged= current_date() where admissionId=?",
        [admissionId], result);
};
//addSupplier:supplierId,fullName,dateRegistered,timeRegistered,
//email,phone,address
exports.addSupplier = (fullName, email, phone, address, result) => {
    sql.run("insert into suppliertb(fullName,email,phone,\
    address) values ( ?,?,?,?)", [fullName, email, phone, address],
        result);
};
//restock:stockId,supplierId,qty,datePurchased
exports.restock = (stockDataList, result) => {
    /*   const list = stockDataList.map((item) => {
          return [item.stockId, item.supplierId,
          item.qty, item.dateAdded]
      });
      console.log('list', list[0]); */

    /* sql.run("insert into purchasetb(stockId,supplierId,\
            qty,datePurchased) values (?,?,?,?)", list[0],
          stockDataList.map((item) => {
              return [item.stockId, item.supplierId,
              item.qty, item.dateAdded]
          }),
          
        result); */
    /* const inp = stockDataList.map((item) => {
        return `(${item.stockId},${item.supplierId},${item.qty},${item.dateAdded})`
    }).join(','); */

    /*  let ti = ''; */
    /*     const inp = `${stockDataList.map((item) => {
            return `(${item.stockId},${item.supplierId},${item.qty},date(${item.dateAdded}))`;
    
        })}`;
     */   // ti = ti.slice(0, 1);

    let dt = [];
    const inp = stockDataList.map((item) => {
        dt.push(...[item.stockId, item.supplierId,
        item.qty, item.dateAdded])
        return `(?,?,?,?)`;

    }).join(',');

    console.log('dt', dt);


    console.log('inp', inp);
    sql.run("insert into purchasetb(stockId,supplierId,\
            qty,datePurchased) values "+ inp, dt, result);
};


//setSupplier:stockId,supplierId,qty,datePurchased
exports.setSupplier = (stockDataList, result) => {
    let dt = [];
    const inp = stockDataList.map((item) => {
        dt.push(...[item.stockId, item.supplierId])
        return `(?,?)`;

    }).join(',');

    console.log('dt', dt);
    sql.run("insert into stockSuppliertb(stockId,supplierId) values " + inp,
        dt, result);
};


//pharmacy issues items
//useStock:stockId,qty,staffId,dateUsed,timeUsed
exports.useStock = (appointmentId, result) => {
    sql.run("update reqItemtb set issued=? where appointmentId=?",
        [true, appointmentId], result);
};

//doctor request for items 
//reqItem:stockId,qty,staffId,dateUsed,timeUsed
exports.reqItem = (stockId, qty, appointmentId, dateUsed,
    timeUsed, result) => {
    sql.run("insert into reqItemtb(stockId,qty, appointmentId,\
    dateUsed,timeUsed)value (?,?,?,?,?)", [stockId, qty,
        appointmentId, dateUsed, timeUsed], result);
};

//createAppointment:patientId,appointmentDate
exports.createAppointment = (patientId, appointmentDate,
    result) => {
    console.log('create app');
    let appointId;
    sql.run("insert into appointmenttb(patientId,\
    appointmentDate, status)\
    values ( ?,?,?)", [patientId, appointmentDate, "pending"],
        function (err) {
            if (err) {
                console.log('err');
                result(err, this)
            }
            else {
                console.log('done 1', this);
                appointId = this;
                sql.all("select staffId from stafftb where designation=?",
                    ["consultant"],
                    function (err, res) {
                        console.log(res);
                        if (err) {
                            console.log('err 2');
                            result(err, res);
                        }
                        else if (res.length) {
                            const staffId = res[0].staffId;
                            console.log('done 2', appointId.lastID);
                            sql.run("update appointmenttb set staffId=? where appointmentId=?",
                                [staffId, appointId.lastID], function (err) {
                                    result(err, this);
                                });
                        }
                        else {
                            console.log('done 3');
                            result(err, appointId);
                        }
                    });

            }
        }
    );
};
//cancelAppointment:appointmentId
exports.cancelAppointment = (appointmentId, result) => {
    sql.run("update appointmenttb set status= ? \
    where appointmentId=?", ['canceled', appointmentId],
        result);
};
//removeStaff:staffId
exports.removeStaff = (staffId, result) => {
    sql.run("delete from stafftb where staffId=?",
        [staffId], result);
};
//queryStaff:staffId,query,dateQueried,queriedBy
exports.queryStaff = (staffId, query, dateQueried, queriedBy,
    result) => {
    sql.run("insert into querytb(staffId,query,\
    dateQueried,queriedBy) values ( ?,?,?,?)", [staffId,
        query, dateQueried, queriedBy], result);
};
//replyQuery:queryId,reply,dateReplied
exports.replyQuery = (queryId, reply, result) => {
    sql.run("update querytb set reply= ?,\
    dateReplied=current_date() where queryId=?",
        [reply, queryId], result);
};
//createStock:name, description
exports.createStock = (name, description, price, result) => {
    sql.run("insert into stocktb(name, description,price)\
    values ( ?,?,?)", [name, description, price], result);
};
//checkLoginStatus:staffId,sessionId,result(err,res)
exports.checkLoginStatus = (staffId, sessionId, result) => {
    sql.all("select * from logintb where staffId=?\
    and sessionId=?", [staffId, sessionId], result);
};

//getDesignation: staffId, result(err,res)
exports.getDesignation = (staffId, result) => {
    sql.all("select designation from stafftb where staffId = ?",
        [staffId], result);
};

//used to create a physician's home page
//getMyAppointments: staffId, result(err,res)

exports.getMyAppointments = (staffId, result) => {
    sql.all("select appointmenttb.appointmentId,\
    appointmenttb.patientId, patienttb.firstName,patienttb.lastName \
    from appointmenttb inner join patienttb on appointmenttb.patientId=patienttb.patientId \
    and appointmenttb.appointmentDate=current_date and appointmenttb.staffId=?\
     and appointmenttb.status=?",
        [staffId, 'pending'], result);
};


//findStaff:lastname,result(err,res)
exports.findStaff = (name, result) => {
    console.log('^' + name, " staff");
    sql.all("select firstName,lastName,phone,image,staffId from\
     stafftb where lastName like ? or firstName like ?",
        [name + '%', name + '%'], result);
};

//findPatient:lastname,result(err,res)
exports.findPatient = (lastname, result) => {
    console.log('^' + lastname, " patient");
    sql.all("select firstName,lastName,phone,image, \
    patientId from patienttb where lastName like ?",
        [lastname + '%'], result);
};

//findSupplier:fullName,result(err,res)
exports.findSupplier = (fullName, result) => {
    console.log('^' + fullName, " supplier");
    sql.all("select fullName,phone, supplierId from suppliertb where fullName like ?",
        [fullName + '%'], result);
};

//findStock:name,result(err,res)
exports.findStock = (name, result) => {
    console.log('^' + name, " stock");
    sql.all("select name,description,stockId from stocktb where name like ?",
        [name + '%'], result);
};

//receptionist
//get all the hospital's appointment for today
//getTodayAppointments:patientId,result(err,res)
exports.getTodayAppointments = (result) => {
    sql.all("select appointmenttb.appointmentDate, appointmenttb.patientId, \
    patienttb.firstName, patienttb.lastName, appointmenttb.appointmentId from \
    appointmenttb inner join patienttb on appointmenttb.patientId=patienttb.patientId\
      where appointmenttb.appointmentDate= \
    current_date and appointmenttb.status=?", ['pending'], result);
};

//get first and last names of a patient
//getPatientNames:patientId,result(err,res)
exports.getPatientNames = (patientId, result) => {
    sql.all("select firstName,lastName from patienttb where \
    patientId=?",
        [patientId], result);
};


//make report of diagnosis, findings and req items([["rice",23],["beans",53]])
//makeReport: doctor, diagnosis,findings,reqItems,result(err,res)
exports.makeReport = (diagnosis, findings,
    appointmentId, treatment, result) => {
    sql.run("update appointmenttb set diagnosis=?,\
    findings=?, status=? where appointmentId=?",
        [diagnosis, findings, "seen", appointmentId],
        function (err) {
            if (err) {
                result(err);
            }
            else if (this.changes > 0) {
                console.log(treatment);
                let dt = [];
                const inp = treatment.map((item) => {
                    dt.push(...[item.stockId, Number(item.qty), item.note, Number(appointmentId)])
                    return `(?,?,?,?)`;

                }).join(',');
                sql.run("insert into reqItemtb(stockId,qty,note,appointmentId) values " + inp,
                    dt, result);
            }
            else {
                result(err);
            }
        });
};

//pharmacy sell req items to patients
//issueReqItems: appointmentId,stockId,result(err,res)
exports.issueReqItems = (appointmentId, stockId, result) => {
    sql.run("update reqItemtb set issued=? where\
    stockId=? and appointmentId=?", [true, stockId,
        appointmentId], result);
};


//pharmacy sell req items to patients
//issueItems: issuedItems:[reqId,reqId,...],result(err,res)
exports.issueItems = (issuedItems, result) => {
    console.log(issuedItems)
    let dt = [];
    const inp = issuedItems.map((item) => {
        /*   dt.push(...[item.stockId, Number(item.qty), item.note, Number(appointmentId)]) */
        return `?`;
    }).join(',');

    console.log(inp)
    sql.run("update reqItemtb set issued=1 where reqId in (" + inp + ")",
        issuedItems, result);
};


/* //get all reports on a patient's previous appointments
//getMedicalReports :patientId,result(err,res)
exports.getMedicalReports = (patientId, result) => {
    sql.query("select appointmentId,appointmentDate,diagnosis,\
    findings, staffId  from appointmenttb\
    where status=? and patientId=?", ["seen", patientId], result);
}; */

//get all reports on a patient's previous appointments
//getMedicalReports :patientId,result(err,res)
exports.getMedicalReports = (patientId, result) => {
    const prescription = {};
    let report = [];
    const finalReport = { 'prescription': prescription, 'medicalReport': report };
    sql.all("select appointmentId,appointmentDate,diagnosis,\
    findings, staffId  from appointmenttb\
    where status=? and patientId=?", ["seen", patientId],
        (err, res1) => {
            if (err) {
                result(err, res1);
            }
            else {
                finalReport['medicalReport'] = res1;
                console.log('medicalReport done', finalReport);
                if (!res1.length) {
                    result(err, finalReport);
                }
                else {
                    for (let item of res1) {
                        sql.all("select stocktb.name, reqItemtb.qty, reqItemtb.note\
                from reqItemtb inner join stocktb on \
                reqItemtb.stockId=stocktb.stockId where \
                reqItemtb.appointmentId=?", [item.appointmentId],
                            (err, res) => {
                                if (err) {
                                    result(err, res);
                                }
                                else {
                                    prescription[item.appointmentId] = res;
                                    console.log(finalReport);
                                    if (res1.length === res1.indexOf(item) + 1) {
                                        console.log('done', finalReport);
                                        result(err, finalReport)
                                    }
                                }
                            }
                        );
                    }
                }
            }
        }
    );
};

//get all reports on a patient's previous appointments
//getReqItems :patientId,result(err,res)
//{ 'reqId': 23, 'name': 'Rice', 'qty': 35, 'note': 'colored one' },
exports.getReqItems = (patientId, result) => {
    sql.all("select reqItemtb.reqId,stocktb.name,reqItemtb.qty,\
    reqItemtb.note, reqItemtb.dateUsed from reqItemtb inner join stocktb on \
    reqItemtb.stockId=stocktb.stockId \
    where reqItemtb.issued=? and reqItemtb.appointmentId in (\
    select appointmentId from appointmenttb where patientId=?)",
        [false, patientId], result);
};

//get patient's bio data
//getPatientBio :patientId,result(err,res)
exports.getPatientBio = (patientId, result) => {
    sql.all("select firstName,lastName,birthday,\
    dateRegistered, timeRegistered,email,phone,address,\
    occupation,religion,married,gender,image \
     from patienttb where patientId=?",
        [patientId], result);
};


//get staff's bio data
//getStaffRecord :staffId,result(err,res)
exports.getStaffRecord = (staffId, result) => {
    sql.all("select staffId,firstName,lastName,birthday,\
    dateEmployed, designation,email,phone,address,password,\
   image  from stafftb where staffId=?",
        [staffId], result);
};


/* 	let bioData = [{'supplierId':45,
    'fullName': 'John company',
   'stocksSupplied':[{'stockName':'Panadol'},
   {'stockName':'Contact Lens'}],
   'address':'25, Sapele road, Benin City',
   'phone':'9838388',
   'email':'yehdh@yehh.hhj'}]; */

//get supplier data
//getSupplierRecord :supplierId,result(err,res)
exports.getSupplierRecord = (supplierId, result) => {
    let data = {};
    let stocks = [];
    sql.all("select supplierId,fullName,\
     email,phone,address \
     from suppliertb where supplierId = ? ",
        [supplierId], (err, res) => {
            if (err) {
                result(err, res);
            }
            else if (res.length) {
                data = res[0];
                sql.all("select name from stocktb where \
                stockId in (select stockId from \
                stockSuppliertb where supplierId=?)",
                    [supplierId], (err, res) => {
                        if (err) {
                            result(err, res);
                        }
                        else {
                            const resp = [{ ...data, 'stocksSupplied': res }]
                            console.log('resp', resp);
                            result(err, resp);
                        }
                    });
            }
            else {
                result(err, res);
            }
        });
};


//createStafftb:staffId,firstName,lastName,dateEmployed,
//designation,address,phone, email,birthday,image,