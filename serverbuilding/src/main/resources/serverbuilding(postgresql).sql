
-- ----------------------------
-- Note
-- status: 1=new, 2=update, 3=delete, 4=notuse.
-- workflow status: 10=executeworkflow, 11=send (to multi receivers), 12=receive, 13=getback, 14=sendback, 15=cancel, 16=approve.
-- notify status: 51=send, 52=view, 53=cannotsend, 55=cancel.
-- ----------------------------

-- ----------------------------
-- Table structure for user with scope as 'user', 'client', 'contact'.
-- ----------------------------
DROP TABLE IF EXISTS public.user;
CREATE TABLE public.user (
	id SERIAL PRIMARY KEY,
	idcalendar integer DEFAULT NULL,
	username varchar(100) DEFAULT NULL,
	password varchar(300) DEFAULT NULL,
	displayname varchar(200) DEFAULT NULL,
	email varchar(200) DEFAULT NULL,
	thumbnail text DEFAULT NULL,
	enabled boolean DEFAULT TRUE,
	firstname varchar(100) DEFAULT NULL,
	lastname varchar(100) DEFAULT NULL,
	address varchar(500) DEFAULT NULL,
	mobile varchar(50) DEFAULT NULL,
	telephone varchar(50) DEFAULT NULL,
	scope varchar(100) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS public.role;
CREATE TABLE public.role (
	id SERIAL PRIMARY KEY,
	code varchar(50) DEFAULT NULL,
	name varchar(100) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for userrole
-- ----------------------------
DROP TABLE IF EXISTS public.userrole;
CREATE TABLE public.userrole (
	id SERIAL PRIMARY KEY,
	iduser integer DEFAULT NULL,
	idrole integer DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS public.permission;
CREATE TABLE public.permission (
	id SERIAL PRIMARY KEY,
	target varchar(100) DEFAULT NULL,
	rules text DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);


-- ----------------------------
-- Table structure for attachment
-- ----------------------------
DROP TABLE IF EXISTS public.attachment;
CREATE TABLE public.attachment (
	id SERIAL PRIMARY KEY,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	filename varchar(300) DEFAULT NULL,
	filesize integer DEFAULT NULL,
	mimetype varchar(150) DEFAULT NULL,
	description varchar(5000) DEFAULT NULL,
	filepath varchar(300) DEFAULT NULL,
	filetype varchar(150) DEFAULT NULL,
	note varchar(1000) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS public.comment;
CREATE TABLE public.comment (
	id SERIAL PRIMARY KEY,
	idwriter integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	content text DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for notify: status as 51=send, 52=view, 53=cannotsend, 55=cancel; method as push message (hàng chục), email (hàng trăm). Ex for method: 10 gởi message, 100 gởi email, 110 gởi message và  email, 20 nhận message, 200 nhận email, 220 nhận message và email.
-- ----------------------------
DROP TABLE IF EXISTS public.notify;
CREATE TABLE public.notify (
	id SERIAL PRIMARY KEY,
	idsender integer DEFAULT NULL,
	idreceiver integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	content text DEFAULT NULL,
	method integer DEFAULT NULL,
	priority integer DEFAULT NULL,
	isactive boolean DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS public.history;
CREATE TABLE public.history (
	id BIGSERIAL PRIMARY KEY,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	content text DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for appconfig.
-- ----------------------------
DROP TABLE IF EXISTS public.appconfig;
CREATE TABLE public.appconfig (
	id SERIAL PRIMARY KEY,
	scope varchar(100) DEFAULT NULL,
	content text DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);



-- ----------------------------
-- Table structure for type.
-- ----------------------------
DROP TABLE IF EXISTS public.type;
CREATE TABLE type (
	id SERIAL PRIMARY KEY,
	idworkflow integer DEFAULT NULL,
	idcategory integer DEFAULT NULL,
	idplanningmode integer DEFAULT NULL,
	scope varchar(100) DEFAULT NULL,
	code varchar(10) DEFAULT NULL,
	name varchar(100) DEFAULT NULL,
	description text DEFAULT NULL,
	priority integer DEFAULT NULL,
	sortorder integer DEFAULT NULL,
	color varchar(7) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for functionrole. Name as Manager, Machine.
-- ----------------------------
DROP TABLE IF EXISTS public.functionrole;
CREATE TABLE functionrole (
	id SERIAL PRIMARY KEY,
	name varchar(100) DEFAULT NULL,
	description text,
	sortorder integer DEFAULT NULL,
	defaultCost decimal(9,2) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for client.
-- ----------------------------
DROP TABLE IF EXISTS public.client;
CREATE TABLE client (
	id SERIAL PRIMARY KEY,
	idclienttype integer DEFAULT NULL,
	clientcode varchar(25) DEFAULT NULL,
	name varchar(100) DEFAULT NULL,
	numTax varchar(100) DEFAULT NULL,
	description text DEFAULT NULL,
	tax decimal(5,2) DEFAULT NULL,
	designation varchar(100) DEFAULT NULL,
	street varchar(100) DEFAULT NULL,
	complement varchar(100) DEFAULT NULL,
	zip varchar(50) DEFAULT NULL,
	city varchar(100) DEFAULT NULL,
	state varchar(100) DEFAULT NULL,
	country varchar(100) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for affectation. reftype as 'user', 'material', 'device'.
-- amount = price * quantity + fee.
-- ----------------------------
DROP TABLE IF EXISTS public.affectation;
CREATE TABLE affectation (
	id SERIAL PRIMARY KEY,
	idproject integer DEFAULT NULL,
	idfunctionrole integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	scope varchar(100) DEFAULT NULL,
	code varchar(50) DEFAULT NULL,
	name varchar(300) DEFAULT NULL,
	price numeric DEFAULT NULL,
	quantity integer DEFAULT NULL,
	fee numeric DEFAULT NULL,
	amount numeric DEFAULT NULL,
	description text DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for project.
-- ----------------------------
DROP TABLE IF EXISTS public.project;
CREATE TABLE project (
	id SERIAL PRIMARY KEY,
	idproject integer DEFAULT NULL,
	idcalendar integer DEFAULT NULL,
	idprojecttype integer DEFAULT NULL,
	idclient integer DEFAULT NULL,
	idcontact integer DEFAULT NULL,
	idmanager integer DEFAULT NULL,
	code varchar(25) DEFAULT NULL,
	name varchar(100) DEFAULT NULL,
	contractcode varchar(25) DEFAULT NULL,
	clientCode varchar(25) DEFAULT NULL,
	progress integer DEFAULT NULL,
	description text DEFAULT NULL,
	color varchar(7) DEFAULT NULL,
	sortorder varchar(400) DEFAULT NULL,
	idcancel integer DEFAULT NULL,
	iddone integer DEFAULT NULL,
	idclose integer DEFAULT NULL,
	donedate date DEFAULT NULL,
	canceldate date DEFAULT NULL,
	closedate date DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for activity.
-- ----------------------------
DROP TABLE IF EXISTS public.activity;
CREATE TABLE activity (
	id SERIAL PRIMARY KEY,
	idactivity integer DEFAULT NULL,
	idproject integer DEFAULT NULL,
	idactivitytype integer DEFAULT NULL,
	idcontact integer DEFAULT NULL,
	name varchar(100) DEFAULT NULL,
	description text DEFAULT NULL,
	creationdate date DEFAULT NULL,
	result text DEFAULT NULL,
	comment varchar(4000) DEFAULT NULL,
	sortorder varchar(400) DEFAULT NULL,
	idcancel integer DEFAULT NULL,
	iddone integer DEFAULT NULL,
	idclose integer DEFAULT NULL,
	donedate date DEFAULT NULL,
	canceldate date DEFAULT NULL,
	closedate date DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for baseline.
-- ----------------------------
DROP TABLE IF EXISTS public.baseline;
CREATE TABLE baseline (
	id SERIAL PRIMARY KEY,
	idproject integer DEFAULT NULL,
	baselinenumber integer DEFAULT NULL,
	name varchar(100) DEFAULT NULL,
	baselinedate date DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for planningelement.
-- ----------------------------
DROP TABLE IF EXISTS public.planningelement;
CREATE TABLE planningelement (
	id SERIAL PRIMARY KEY,
	idproject integer DEFAULT NULL,
	idplanningmode integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	initialstartdate date DEFAULT NULL,
	validatedstartdate date DEFAULT NULL,
	plannedstartdate date DEFAULT NULL,
	realstartdate date DEFAULT NULL,
	initialenddate date DEFAULT NULL,
	validatedenddate date DEFAULT NULL,
	plannedenddate date DEFAULT NULL,
	realenddate date DEFAULT NULL,
	initialduration integer DEFAULT NULL,
	validatedduration integer DEFAULT NULL,
	plannedduration integer DEFAULT NULL,
	realduration integer DEFAULT NULL,
	initialwork decimal(14,5) DEFAULT '0.00000',
	validatedwork decimal(14,5) DEFAULT '0.00000',
	plannedwork decimal(14,5) DEFAULT '0.00000',
	realwork decimal(14,5) DEFAULT '0.00000',
	wbs varchar(100) DEFAULT NULL,
	wbssortable varchar(400) DEFAULT NULL,
	priority integer DEFAULT NULL,
	leftwork decimal(14,5) DEFAULT '0.00000',
	assignedwork decimal(14,5) DEFAULT '0.00000',
	dependencylevel decimal(3,0) DEFAULT NULL,
	initialcost decimal(11,2) DEFAULT NULL,
	validatedcost decimal(11,2) DEFAULT NULL,
	assignedcost decimal(11,2) DEFAULT NULL,
	realcost decimal(11,2) DEFAULT NULL,
	leftcost decimal(11,2) DEFAULT NULL,
	plannedcost decimal(11,2) DEFAULT NULL,
	progress integer DEFAULT '0',
	expectedprogress integer DEFAULT NULL,
	workelementestimatedwork decimal(9,5) DEFAULT NULL,
	workelementrealwork decimal(9,5) DEFAULT NULL,
	workelementleftwork decimal(9,5) DEFAULT NULL,
	workelementCount decimal(5,0) DEFAULT NULL,
	expenseassignedamount decimal(11,2) DEFAULT NULL,
	expenseplannedamount decimal(11,2) DEFAULT NULL,
	expenserealamount decimal(11,2) DEFAULT NULL,
	expenseleftamount decimal(11,2) DEFAULT NULL,
	expensevalidatedamount decimal(11,2) DEFAULT NULL,
	totalassignedcost decimal(12,2) DEFAULT NULL,
	totalplannedcost decimal(12,2) DEFAULT NULL,
	totalrealcost decimal(12,2) DEFAULT NULL,
	totalleftcost decimal(12,2) DEFAULT NULL,
	totalvalidatedcost decimal(12,2) DEFAULT NULL,
	notplannedwork decimal(12,5) DEFAULT '0.00000',
	marginwork decimal(14,5) DEFAULT NULL,
	margincost decimal(14,5) DEFAULT NULL,
	marginworkpct integer DEFAULT NULL,
	margincostpct integer DEFAULT NULL,
	reserveamount decimal(12,2) DEFAULT NULL,
	validatedexpensecalculated integer DEFAULT '0',
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for planningelementbaseline.
-- ----------------------------
DROP TABLE IF EXISTS public.planningelementbaseline;
CREATE TABLE planningelementbaseline (
	id SERIAL PRIMARY KEY,
	idbaseline integer DEFAULT NULL,
	idproject integer DEFAULT NULL,
	idplanningmode integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	initialstartdate date DEFAULT NULL,
	validatedstartdate date DEFAULT NULL,
	plannedstartdate date DEFAULT NULL,
	realstartdate date DEFAULT NULL,
	initialenddate date DEFAULT NULL,
	validatedenddate date DEFAULT NULL,
	plannedenddate date DEFAULT NULL,
	realenddate date DEFAULT NULL,
	initialduration integer DEFAULT NULL,
	validatedduration integer DEFAULT NULL,
	plannedduration integer DEFAULT NULL,
	realduration integer DEFAULT NULL,
	initialwork decimal(14,5) DEFAULT '0.00000',
	validatedwork decimal(14,5) DEFAULT '0.00000',
	plannedwork decimal(14,5) DEFAULT '0.00000',
	realwork decimal(14,5) DEFAULT '0.00000',
	wbs varchar(100) DEFAULT NULL,
	wbssortable varchar(400) DEFAULT NULL,
	priority integer DEFAULT NULL,
	leftwork decimal(14,5) DEFAULT '0.00000',
	assignedwork decimal(14,5) DEFAULT '0.00000',
	dependencylevel decimal(3,0) DEFAULT NULL,
	initialcost decimal(11,2) DEFAULT NULL,
	validatedcost decimal(11,2) DEFAULT NULL,
	assignedcost decimal(11,2) DEFAULT NULL,
	realcost decimal(11,2) DEFAULT NULL,
	leftcost decimal(11,2) DEFAULT NULL,
	plannedcost decimal(11,2) DEFAULT NULL,
	progress integer DEFAULT '0',
	expectedprogress integer DEFAULT NULL,
	workelementestimatedwork decimal(9,5) DEFAULT NULL,
	workelementrealwork decimal(9,5) DEFAULT NULL,
	workelementleftwork decimal(9,5) DEFAULT NULL,
	workelementCount decimal(5,0) DEFAULT NULL,
	expenseassignedamount decimal(11,2) DEFAULT NULL,
	expenseplannedamount decimal(11,2) DEFAULT NULL,
	expenserealamount decimal(11,2) DEFAULT NULL,
	expenseleftamount decimal(11,2) DEFAULT NULL,
	expensevalidatedamount decimal(11,2) DEFAULT NULL,
	totalassignedcost decimal(12,2) DEFAULT NULL,
	totalplannedcost decimal(12,2) DEFAULT NULL,
	totalrealcost decimal(12,2) DEFAULT NULL,
	totalleftcost decimal(12,2) DEFAULT NULL,
	totalvalidatedcost decimal(12,2) DEFAULT NULL,
	notplannedwork decimal(12,5) DEFAULT '0.00000',
	marginwork decimal(14,5) DEFAULT NULL,
	margincost decimal(14,5) DEFAULT NULL,
	marginworkpct integer DEFAULT NULL,
	margincostpct integer DEFAULT NULL,
	reserveamount decimal(12,2) DEFAULT NULL,
	validatedexpensecalculated integer DEFAULT '0',
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for assignment.
-- ----------------------------
DROP TABLE IF EXISTS public.assignment;
CREATE TABLE assignment (
	id SERIAL PRIMARY KEY,
	idproject integer  NOT NULL,
	idaffectation integer DEFAULT NULL,
	idfunctionrole integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	rate integer DEFAULT '100',
	assignedwork decimal(12,5) DEFAULT NULL,
	realwork decimal(12,5) DEFAULT NULL,
	leftwork decimal(12,5) DEFAULT NULL,
	plannedwork decimal(12,5) DEFAULT NULL,
	realstartdate date DEFAULT NULL,
	realenddate date DEFAULT NULL,
	comment varchar(4000) DEFAULT NULL,
	plannedstartdate date DEFAULT NULL,
	plannedenddate date DEFAULT NULL,
	dailycost decimal(11,2) DEFAULT NULL,
	newddailycost decimal(11,2) DEFAULT NULL,
	assignedcost decimal(11,2) DEFAULT NULL,
	realcost decimal(11,2) DEFAULT NULL,
	leftcost decimal(11,2) DEFAULT NULL,
	plannedcost decimal(11,2) DEFAULT NULL,
	billedwork decimal(10,2) NOT NULL DEFAULT '0.00',
	notplannedwork decimal(12,5) DEFAULT '0.00000',
	optional integer DEFAULT '0',
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for planningmode.
-- ----------------------------
DROP TABLE IF EXISTS public.planningmode;
CREATE TABLE planningmode (
	id SERIAL PRIMARY KEY,
	name varchar(100) DEFAULT NULL,
	code varchar(5) DEFAULT NULL,
	sortorder integer DEFAULT NULL,
	mandatorystartdate integer DEFAULT '0',
	mandatoryenddate integer DEFAULT '0',
	applyto varchar(20) DEFAULT NULL,
	mandatoryDuration integer DEFAULT '0',
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for plannedwork.
-- ----------------------------
DROP TABLE IF EXISTS public.plannedwork;
CREATE TABLE plannedwork (
	id SERIAL PRIMARY KEY,
	idproject integer DEFAULT NULL,
	idassignment integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	work decimal(8,5) DEFAULT NULL,
	workdate date DEFAULT NULL,
	day varchar(8) DEFAULT NULL,
	week varchar(6) DEFAULT NULL,
	month varchar(6) DEFAULT NULL,
	year varchar(4) DEFAULT NULL,
	dailycost decimal(7,2) DEFAULT NULL,
	cost decimal(11,2) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for plannedworkbaseline.
-- ----------------------------
DROP TABLE IF EXISTS public.plannedworkbaseline;
CREATE TABLE plannedworkbaseline (
	id SERIAL PRIMARY KEY,
	idbaseline integer DEFAULT NULL,
	idproject integer DEFAULT NULL,
	idassignment integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	work decimal(8,5) DEFAULT NULL,
	workdate date DEFAULT NULL,
	day varchar(8) DEFAULT NULL,
	week varchar(6) DEFAULT NULL,
	month varchar(6) DEFAULT NULL,
	year varchar(4) DEFAULT NULL,
	dailycost decimal(7,2) DEFAULT NULL,
	cost decimal(11,2) DEFAULT NULL,
	isrealwork boolean DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for workelement.
-- ----------------------------
DROP TABLE IF EXISTS public.workelement;
CREATE TABLE workelement (
	id SERIAL PRIMARY KEY,
	idproject integer DEFAULT NULL,
	idactivity integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	plannedwork decimal(9,5) DEFAULT '0.00000',
	realwork decimal(9,5) DEFAULT '0.00000',
	leftwork decimal(9,5) DEFAULT '0.00000',
	ongoing integer DEFAULT '0',
	ongoingstartdatetime timestamp DEFAULT NULL,
	realCost decimal(11,2) DEFAULT NULL,
	leftCost decimal(11,2) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for work.
-- ----------------------------
DROP TABLE IF EXISTS public.work;
CREATE TABLE work (
	id SERIAL PRIMARY KEY,
	idproject integer  NOT NULL,
	idworkelement integer DEFAULT NULL,
	idassignment integer DEFAULT NULL,
	idref integer DEFAULT NULL,
	reftype varchar(50) DEFAULT NULL,
	work decimal(8,5) DEFAULT NULL,
	workdate date DEFAULT NULL,
	day varchar(8) DEFAULT NULL,
	week varchar(6) DEFAULT NULL,
	month varchar(6) DEFAULT NULL,
	year varchar(4) DEFAULT NULL,
	dailycost decimal(11,2) DEFAULT NULL,
	cost decimal(11,2) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for dependable.
-- ----------------------------
DROP TABLE IF EXISTS public.dependable;
CREATE TABLE dependable (
	id SERIAL PRIMARY KEY,
	name varchar(100) DEFAULT NULL,
	scope varchar(10) DEFAULT 'PE',
	isdefault boolean DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for dependency.
-- ----------------------------
DROP TABLE IF EXISTS public.dependency;
CREATE TABLE dependency (
	id SERIAL PRIMARY KEY,
	idrefpredecessor integer DEFAULT NULL,
	idrefsuccessorI integer DEFAULT NULL,
	reftypepredecessor varchar(50) DEFAULT NULL,
	reftypesuccessorI varchar(50) DEFAULT NULL,
	dependencytype varchar(12) DEFAULT NULL,
	dependencydelay integer DEFAULT '0',
	comment varchar(4000) DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for status.
-- ----------------------------
DROP TABLE IF EXISTS public.status;
CREATE TABLE status (
	id SERIAL PRIMARY KEY,
	name varchar(100) DEFAULT NULL,
	setdonestatus integer DEFAULT '0',
	setidlestatus integer DEFAULT NULL,
	sethandledstatus integer DEFAULT '0',
	setcancelledstatus integer DEFAULT '0',
	color varchar(7) DEFAULT NULL,
	sortorder integer DEFAULT NULL,
	idle integer DEFAULT '0',
	iscopystatus integer DEFAULT '0',
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for workflow.
-- ----------------------------
DROP TABLE IF EXISTS public.workflow;
CREATE TABLE workflow (
	id SERIAL PRIMARY KEY,
	name varchar(100) DEFAULT NULL,
	description text DEFAULT NULL,
	idle integer DEFAULT '0',
	sortorder integer DEFAULT NULL,
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

-- ----------------------------
-- Table structure for workflowstatus.
-- ----------------------------
DROP TABLE IF EXISTS public.workflowstatus;
CREATE TABLE workflowstatus (
	id SERIAL PRIMARY KEY,
	idworkflow integer  NOT NULL,
	idstatusFrom integer  NOT NULL,
	idstatusTo integer  NOT NULL,
	scope integer  NOT NULL,
	allowed integer DEFAULT '0',
	status integer DEFAULT NULL,
	idowner integer DEFAULT NULL,
	idcreate integer DEFAULT NULL,
	idupdate integer DEFAULT NULL,
	iddelete integer DEFAULT NULL,
	idlock integer DEFAULT NULL,
	createdate timestamp with time zone DEFAULT NULL,
	updatedate timestamp with time zone DEFAULT NULL,
	deletedate timestamp with time zone DEFAULT NULL,
	lockdate timestamp with time zone DEFAULT NULL,
	version integer DEFAULT NULL
);

