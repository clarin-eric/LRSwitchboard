// -------------------------------------------
// The CLARIN Language Resource Switchboard
// 2016-18 Claus Zinn, University of Tuebingen
// 
// File: Tool.jsx
// Time-stamp: <2019-01-16 10:53:55 (zinn)>
// -------------------------------------------

import React from 'react';
import { Accordion, AccordionItem, AccordionItemTitle,
    AccordionItemBody } from 'react-accessible-accordion';

import { map639_1_to_639_3, map639_3_to_639_1 } from '../back-end/util';
import {gatherInvocationParameters, invokeBrowserBasedTool} from '../back-end/ToolInvoker';
import Request from 'superagent';

export default class Tool extends React.Component {
    constructor(props) {
	super(props);

	const {cb, items, resource, ...otherProps} = this.props;
	this.cb = cb;
	this.invokeTool = this.invokeTool.bind(this);
    }

    invokeTool( URL ) {
	_paq.push(["trackEvent", 'ToolInvocation', URL]); 
	invokeBrowserBasedTool( URL );
    }
    
    // de-activated as it may yield a CORS-related error.
    invokeToolInactive( URL ) {
	Request
	    .head(URL)
	    .end((err, res) => {
		 if (err) {
		     console.log('Tool/invokeTool:', URL, err);
		 } else {
		     console.log('Tool/invokeTool:', URL, res);
		     invokeBrowserBasedTool( URL );
		     _paq.push(["trackEvent", 'ToolInvocation', URL, res.status]); 	    
		 }});
    }
    
    render() {
	const {items, resource, ...props} = this.props;

	const styles = {
	    cardHeader: {
		display: 'flex',
		height: '100px',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 20px',
		color: '#000',
	    },
	    headerName: {
		margin: 0,
		fontWeight: 500,
		fontSize: '12px',
		textAlign: 'right'
	    },
	    headerTitle: {
		margin: '2px 0 0',
		fontWeight: 500,
		fontSize: '12px',
   	        opacity: 0.8,
		color: '#000',	    
		textAlign: 'right'
	    }
	};

	const ProfilePicture = ({ imgSrc, borderColor }) => (
	<img
		style={{
			width: '60px',
			height: '60px',
			borderRadius: '100%',
			border: `3px solid ${borderColor}`
		}}
		src={imgSrc}
	/>
	);

	const ToolCard = (props) => {
            const fullURL = gatherInvocationParameters(props, resource);
	    const authenticationNotRequired = (props.authentication == "no");
//	    console.log('Tool/ToolCard', props);
	    const outputFormats = (props.output === undefined) || ((props.output instanceof Array) && props.output.join(', ')) || props.output;

	    if (fullURL)
	
		return(
			<div style={{ position: 'relative', top: 0 }}>
			  <header style={styles.cardHeader} className='card-header-details'>
			    <ProfilePicture imgSrc={props.imgSrc} borderColor={props.imgBorderColor} />
			  </header>
			  
			  <div style={{color: '#000'}}>
			    <DetailsRow
	                       icon='icon ion-ios-paper-outline'
			       title="Description"
       	                       summary={props.role}	    
                               />
			    
			    <DetailsRow
			       icon='ion-ios-home-outline'
	                       title="Home"
       	                       summary={props.homepage}
                               />

			    { authenticationNotRequired ? (

			       			    <DetailsRow
						      icon='ion-ios-unlocked-outline'
						      title="Authentication"
       						      summary={props.authentication}
						      />		
						    ) : (
			       			    <DetailsRow
						      icon='ion-ios-locked-outline'
						      title="Authentication"
       						      summary={props.authentication}
						      />								    
						    )}

			    <DetailsRow
			       icon='ion-ios-barcode-outline'
	                       title="Output Format"
       	                       summary={outputFormats}
                               />		

			    <DetailsRow
			       icon='ion-ios-paperplane-outline'
	                       title="URL"
       	                       summary={fullURL}
                               />
			    
                            <DetailsRow
			       icon='ion-ios-location-outline'
	                       title="Location"
	                       summary={props.location}
	                       />
			    
                            <DetailsRow
			       icon='ion-ios-email-outline'
			       title="e-mail"
			       summary={props.email}	    
			       />
			  </div>
			</div>
	    )

	    return (
	     <div style={{ position: 'relative', top: 0 }}>
	       <header style={styles.cardHeader} className='card-header-details'>
		 <ProfilePicture imgSrc={props.imgSrc} borderColor={props.imgBorderColor} />
	       </header>

	       <div style={{color: '#000'}}>
		 <DetailsRow
	            icon='icon ion-ios-paper-outline'
		    title="Description"
       	            summary={props.role}	    
                    />
		 
		 <DetailsRow
		    icon='ion-ios-home-outline'
	            title="Home"
       	            summary={props.homepage}
                    />

			    { authenticationNotRequired ? (

			       			    <DetailsRow
						      icon='ion-ios-unlocked-outline'
						      title="Authentication"
       						      summary={props.authentication}
						      />		
						    ) : (
			       			    <DetailsRow
						      icon='ion-ios-locked-outline'
						      title="Authentication"
       						      summary={props.authentication}
						      />								    
						    )}

			    <DetailsRow
			       icon='ion-ios-barcode-outline'
	                       title="Output Format"
       	                       summary={outputFormats}
                               />		
		
                 <DetailsRow
		    icon='ion-ios-location-outline'
	            title="Location"
	            summary={props.location}
	            />
		 
                 <DetailsRow
		    icon='ion-ios-email-outline'
		    title="e-mail"
		    summary={props.email}	    
		    />
		 
	       </div>
	     </div>
	    )
	};

	const DetailsRow = ({ icon, title, summary }) => {
	    const styles = {
		row: {
			width: '100%',
			padding: '20 20px',
			display: 'flex',
			alignItems: 'center',
			margin: '-10px 0'
		},
		icon: {
			display: 'block',
			width: '30px',
			height: '30px',
			margin: '0px 20px 0 0',
			textAlign: 'center',
			fontSize: '24px'
		},
		title: {
			fontWeight: 500,
			fontSize: '12px',
			margin: 0,
			fontStyle: 'italic'
		}
	    };
	    
	    const renderSummary = () => {
		if ((title == "URL") && ( summary )) return (
		    <p style={{ fontWeight: 100, fontSize: '16px', lineHeight: 1.5 }}>
		    <button onClick={this.invokeTool.bind(this,summary)} > Click to start tool </button>		    
		    </p>
		);

		if ((title == "Home") && (summary) ) return (
		    <p style={{ fontWeight: 100, fontSize: '16px', lineHeight: 1.5 }}>
			<a href={summary} target="_blank"> {summary }</a> 
		    </p>
		);
		
		if(summary) return (
			<p style={{ fontWeight: 100, fontSize: '16px', lineHeight: 1.4 }} >
				{summary}
			</p>
		);
		return null;
	    };

	    return (
		<div style={styles.row}>
		<span className={`icon ${icon}`}
			style={Object.assign({}, styles.icon, {alignSelf: 'flex-start'})}></span>
			<div style={{ width: '100%' }}>
				{renderSummary()}
			</div>
		</div>
	    );
	};

	return (
		<Accordion accordion={false} >
		  { items.map( (element, index) => 
		  <AccordionItem key={index} >
		    <AccordionItemTitle>
                      <h4>{element.name}</h4>
		    </AccordionItemTitle>
		    <AccordionItemBody>
		      <ToolCard key={index}
				imgSrc={element.logo}
				imgBorderColor='#6A067A'
				name={element.name}
				title={element.name}
				softwareType={element.softwareType}
				requestType={element.requestType}
				location={element.location}
				authentication={element.authentication}
				homepage={element.homepage}
				url={element.url}
				parameters={element.parameters}
				mapping={element.mapping}
				output={element.output}
				langEncoding={element.langEncoding}		
				email={element.email}
				role={element.description}
				/>
		    </AccordionItemBody>
		  </AccordionItem>
			     )}
	    </Accordion> 	    
	)}
}
