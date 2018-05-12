
// This Bean has a basic Primary Key (not composite) 

package com.redsun.server.building.model;

import java.io.Serializable;

//import javax.validation.constraints.* ;
//import org.hibernate.validator.constraints.* ;

import java.util.Date;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="project", schema="public" )
public class Project implements Serializable
{
    private static final long serialVersionUID = 1L;

    //----------------------------------------------------------------------
    // ENTITY PRIMARY KEY ( BASED ON A SINGLE FIELD )
    //----------------------------------------------------------------------
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id", nullable=false)
    private Integer    id           ;


    //----------------------------------------------------------------------
    // ENTITY DATA FIELDS 
    //----------------------------------------------------------------------    
    @Column(name="idproject")
    private Integer    idproject    ;

    @Column(name="idcalendar")
    private Integer    idcalendar   ;

    @Column(name="idprojecttype")
    private Integer    idprojecttype ;

    @Column(name="idclient")
    private Integer    idclient     ;

    @Column(name="idcontact")
    private Integer    idcontact    ;

    @Column(name="idmanager")
    private Integer    idmanager    ;

    @Column(name="progress")
    private Integer    progress     ;

    @Column(name="code", length=25)
    private String     code  ;

    @Column(name="contractcode", length=25)
    private String     contractcode ;

    @Column(name="clientcode", length=25)
    private String     clientcode   ;

    @Column(name="name", length=100)
    private String     name         ;

    @Column(name="description", length=2147483647)
    private String     description  ;

    @Column(name="color", length=7)
    private String     color        ;

    @Column(name="sortorder", length=400)
    private String     sortorder    ;

    @Column(name="idcancel")
    private Integer    idcancel     ;

    @Column(name="iddone")
    private Integer    iddone       ;

    @Column(name="idclose")
    private Integer    idclose      ;

    @Temporal(TemporalType.DATE)
    @Column(name="donedate")
    private Date       donedate     ;

    @Temporal(TemporalType.DATE)
    @Column(name="canceldate")
    private Date       canceldate   ;

    @Temporal(TemporalType.DATE)
    @Column(name="closedate")
    private Date       closedate    ;

    @Column(name="status")
    private Integer    status       ;

	@JsonIgnore
    @Column(name="idowner")
    private Integer    idowner      ;

	@JsonIgnore
    @Column(name="idcreate")
    private Integer    idcreate     ;

	@JsonIgnore
    @Column(name="idupdate")
    private Integer    idupdate     ;

	@JsonIgnore
    @Column(name="iddelete")
    private Integer    iddelete     ;

	@JsonIgnore
    @Column(name="idlock")
    private Integer    idlock       ;

	@JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="createdate")
    private Date       createdate   ;

	@JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="updatedate")
    private Date       updatedate   ;

	@JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="deletedate")
    private Date       deletedate   ;

	@JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="lockdate")
    private Date       lockdate     ;

    @Column(name="version")
    private Integer    version      ;


    //----------------------------------------------------------------------
    // CONSTRUCTOR(S)
    //----------------------------------------------------------------------
    public Project()
    {
		super();
    }
    
    //----------------------------------------------------------------------
    // GETTER & SETTER FOR THE KEY FIELD
    //----------------------------------------------------------------------
    public void setId( Integer id )
    {
        this.id = id ;
    }
    public Integer getId()
    {
        return this.id;
    }

    //----------------------------------------------------------------------
    // GETTERS & SETTERS FOR FIELDS
    //----------------------------------------------------------------------
    //--- DATABASE MAPPING : idproject ( int4 ) 
    public void setIdproject( Integer idproject )
    {
        this.idproject = idproject;
    }
    public Integer getIdproject()
    {
        return this.idproject;
    }

    //--- DATABASE MAPPING : idcalendar ( int4 ) 
    public void setIdcalendar( Integer idcalendar )
    {
        this.idcalendar = idcalendar;
    }
    public Integer getIdcalendar()
    {
        return this.idcalendar;
    }

    //--- DATABASE MAPPING : idprojecttype ( int4 ) 
    public void setIdprojecttype( Integer idprojecttype )
    {
        this.idprojecttype = idprojecttype;
    }
    public Integer getIdprojecttype()
    {
        return this.idprojecttype;
    }

    //--- DATABASE MAPPING : idclient ( int4 ) 
    public void setIdclient( Integer idclient )
    {
        this.idclient = idclient;
    }
    public Integer getIdclient()
    {
        return this.idclient;
    }

    //--- DATABASE MAPPING : idcontact ( int4 ) 
    public void setIdcontact( Integer idcontact )
    {
        this.idcontact = idcontact;
    }
    public Integer getIdcontact()
    {
        return this.idcontact;
    }

    //--- DATABASE MAPPING : idmanager ( int4 ) 
    public void setIdmanager( Integer idmanager )
    {
        this.idmanager = idmanager;
    }
    public Integer getIdmanager()
    {
        return this.idmanager;
    }

    //--- DATABASE MAPPING : progress ( int4 ) 
    public void setProgress( Integer progress )
    {
        this.progress = progress;
    }
    public Integer getProgress()
    {
        return this.progress;
    }

    //--- DATABASE MAPPING : code ( varchar ) 
    public void setCode( String code )
    {
        this.code = code;
    }
    public String getCode()
    {
        return this.code;
    }

    //--- DATABASE MAPPING : contractcode ( varchar ) 
    public void setContractcode( String contractcode )
    {
        this.contractcode = contractcode;
    }
    public String getContractcode()
    {
        return this.contractcode;
    }

    //--- DATABASE MAPPING : clientcode ( varchar ) 
    public void setClientcode( String clientcode )
    {
        this.clientcode = clientcode;
    }
    public String getClientcode()
    {
        return this.clientcode;
    }

    //--- DATABASE MAPPING : name ( varchar ) 
    public void setName( String name )
    {
        this.name = name;
    }
    public String getName()
    {
        return this.name;
    }

    //--- DATABASE MAPPING : description ( text ) 
    public void setDescription( String description )
    {
        this.description = description;
    }
    public String getDescription()
    {
        return this.description;
    }

    //--- DATABASE MAPPING : color ( varchar ) 
    public void setColor( String color )
    {
        this.color = color;
    }
    public String getColor()
    {
        return this.color;
    }

    //--- DATABASE MAPPING : sortorder ( varchar ) 
    public void setSortorder( String sortorder )
    {
        this.sortorder = sortorder;
    }
    public String getSortorder()
    {
        return this.sortorder;
    }

    //--- DATABASE MAPPING : idcancel ( int4 ) 
    public void setIdcancel( Integer idcancel )
    {
        this.idcancel = idcancel;
    }
    public Integer getIdcancel()
    {
        return this.idcancel;
    }

    //--- DATABASE MAPPING : iddone ( int4 ) 
    public void setIddone( Integer iddone )
    {
        this.iddone = iddone;
    }
    public Integer getIddone()
    {
        return this.iddone;
    }

    //--- DATABASE MAPPING : idclose ( int4 ) 
    public void setIdclose( Integer idclose )
    {
        this.idclose = idclose;
    }
    public Integer getIdclose()
    {
        return this.idclose;
    }

    //--- DATABASE MAPPING : donedate ( date ) 
    public void setDonedate( Date donedate )
    {
        this.donedate = donedate;
    }
    public Date getDonedate()
    {
        return this.donedate;
    }

    //--- DATABASE MAPPING : canceldate ( date ) 
    public void setCanceldate( Date canceldate )
    {
        this.canceldate = canceldate;
    }
    public Date getCanceldate()
    {
        return this.canceldate;
    }

    //--- DATABASE MAPPING : closedate ( date ) 
    public void setClosedate( Date closedate )
    {
        this.closedate = closedate;
    }
    public Date getClosedate()
    {
        return this.closedate;
    }

    //--- DATABASE MAPPING : status ( int4 ) 
    public void setStatus( Integer status )
    {
        this.status = status;
    }
    public Integer getStatus()
    {
        return this.status;
    }

    //--- DATABASE MAPPING : idowner ( int4 ) 
    public void setIdowner( Integer idowner )
    {
        this.idowner = idowner;
    }
    public Integer getIdowner()
    {
        return this.idowner;
    }

    //--- DATABASE MAPPING : idcreate ( int4 ) 
    public void setIdcreate( Integer idcreate )
    {
        this.idcreate = idcreate;
    }
    public Integer getIdcreate()
    {
        return this.idcreate;
    }

    //--- DATABASE MAPPING : idupdate ( int4 ) 
    public void setIdupdate( Integer idupdate )
    {
        this.idupdate = idupdate;
    }
    public Integer getIdupdate()
    {
        return this.idupdate;
    }

    //--- DATABASE MAPPING : iddelete ( int4 ) 
    public void setIddelete( Integer iddelete )
    {
        this.iddelete = iddelete;
    }
    public Integer getIddelete()
    {
        return this.iddelete;
    }

    //--- DATABASE MAPPING : idlock ( int4 ) 
    public void setIdlock( Integer idlock )
    {
        this.idlock = idlock;
    }
    public Integer getIdlock()
    {
        return this.idlock;
    }

    //--- DATABASE MAPPING : createdate ( timestamptz ) 
    public void setCreatedate( Date createdate )
    {
        this.createdate = createdate;
    }
    public Date getCreatedate()
    {
        return this.createdate;
    }

    //--- DATABASE MAPPING : updatedate ( timestamptz ) 
    public void setUpdatedate( Date updatedate )
    {
        this.updatedate = updatedate;
    }
    public Date getUpdatedate()
    {
        return this.updatedate;
    }

    //--- DATABASE MAPPING : deletedate ( timestamptz ) 
    public void setDeletedate( Date deletedate )
    {
        this.deletedate = deletedate;
    }
    public Date getDeletedate()
    {
        return this.deletedate;
    }

    //--- DATABASE MAPPING : lockdate ( timestamptz ) 
    public void setLockdate( Date lockdate )
    {
        this.lockdate = lockdate;
    }
    public Date getLockdate()
    {
        return this.lockdate;
    }

    //--- DATABASE MAPPING : version ( int4 ) 
    public void setVersion( Integer version )
    {
        this.version = version;
    }
    public Integer getVersion()
    {
        return this.version;
    }


    //----------------------------------------------------------------------
    // GETTERS & SETTERS FOR LINKS
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // toString METHOD
    //----------------------------------------------------------------------
	public String toString() {
    	String value = "";
        StringBuffer sb = new StringBuffer(); 
        sb.append("{");
        sb.append("\"id\":");
        sb.append(id);
    	sb.append(",\"idproject\":");
        value = idproject == null ? "null" : "\"" + idproject + "\"";
        sb.append(value);
    	sb.append(",\"idcalendar\":");
        value = idcalendar == null ? "null" : "\"" + idcalendar + "\"";
        sb.append(value);
    	sb.append(",\"idprojecttype\":");
        value = idprojecttype == null ? "null" : "\"" + idprojecttype + "\"";
        sb.append(value);
    	sb.append(",\"idclient\":");
        value = idclient == null ? "null" : "\"" + idclient + "\"";
        sb.append(value);
    	sb.append(",\"idcontact\":");
        value = idcontact == null ? "null" : "\"" + idcontact + "\"";
        sb.append(value);
    	sb.append(",\"idmanager\":");
        value = idmanager == null ? "null" : "\"" + idmanager + "\"";
        sb.append(value);
    	sb.append(",\"progress\":");
        value = progress == null ? "null" : "\"" + progress + "\"";
        sb.append(value);
    	sb.append(",\"code\":");
        value = code == null ? "null" : "\"" + code + "\"";
        sb.append(value);
    	sb.append(",\"contractcode\":");
        value = contractcode == null ? "null" : "\"" + contractcode + "\"";
        sb.append(value);
    	sb.append(",\"clientcode\":");
        value = clientcode == null ? "null" : "\"" + clientcode + "\"";
        sb.append(value);
    	sb.append(",\"name\":");
        value = name == null ? "null" : "\"" + name + "\"";
        sb.append(value);
    	sb.append(",\"description\":");
        value = description == null ? "null" : "\"" + description + "\"";
        sb.append(value);
    	sb.append(",\"color\":");
        value = color == null ? "null" : "\"" + color + "\"";
        sb.append(value);
    	sb.append(",\"sortorder\":");
        value = sortorder == null ? "null" : "\"" + sortorder + "\"";
        sb.append(value);
    	sb.append(",\"idcancel\":");
        value = idcancel == null ? "null" : "\"" + idcancel + "\"";
        sb.append(value);
    	sb.append(",\"iddone\":");
        value = iddone == null ? "null" : "\"" + iddone + "\"";
        sb.append(value);
    	sb.append(",\"idclose\":");
        value = idclose == null ? "null" : "\"" + idclose + "\"";
        sb.append(value);
    	sb.append(",\"donedate\":");
        value = donedate == null ? "null" : "\"" + donedate + "\"";
        sb.append(value);
    	sb.append(",\"canceldate\":");
        value = canceldate == null ? "null" : "\"" + canceldate + "\"";
        sb.append(value);
    	sb.append(",\"closedate\":");
        value = closedate == null ? "null" : "\"" + closedate + "\"";
        sb.append(value);
    	sb.append(",\"status\":");
        value = status == null ? "null" : "\"" + status + "\"";
        sb.append(value);
    	sb.append(",\"idowner\":");
        value = idowner == null ? "null" : "\"" + idowner + "\"";
        sb.append(value);
    	sb.append(",\"idcreate\":");
        value = idcreate == null ? "null" : "\"" + idcreate + "\"";
        sb.append(value);
    	sb.append(",\"idupdate\":");
        value = idupdate == null ? "null" : "\"" + idupdate + "\"";
        sb.append(value);
    	sb.append(",\"iddelete\":");
        value = iddelete == null ? "null" : "\"" + iddelete + "\"";
        sb.append(value);
    	sb.append(",\"idlock\":");
        value = idlock == null ? "null" : "\"" + idlock + "\"";
        sb.append(value);
    	sb.append(",\"createdate\":");
        value = createdate == null ? "null" : "\"" + createdate + "\"";
        sb.append(value);
    	sb.append(",\"updatedate\":");
        value = updatedate == null ? "null" : "\"" + updatedate + "\"";
        sb.append(value);
    	sb.append(",\"deletedate\":");
        value = deletedate == null ? "null" : "\"" + deletedate + "\"";
        sb.append(value);
    	sb.append(",\"lockdate\":");
        value = lockdate == null ? "null" : "\"" + lockdate + "\"";
        sb.append(value);
    	sb.append(",\"version\":");
        value = version == null ? "null" : "\"" + version + "\"";
        sb.append(value);
        sb.append("}");
        return sb.toString(); 
    }


    //----------------------------------------------------------------------
    // ENTITY LINKS ( RELATIONSHIP )
    //----------------------------------------------------------------------

}