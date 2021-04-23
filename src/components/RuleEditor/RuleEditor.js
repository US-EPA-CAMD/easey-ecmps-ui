import axios from 'axios';
import React, { useState, useEffect } from "react";

import {
  Label,
  Radio,  
  Button,
  Checkbox,
  Dropdown,
  Fieldset,  
  Textarea,
  TextInput,
  FormGroup,
} from '@trussworks/react-uswds';

import config from '../../config';

import './RuleEditor.scss';

const RuleEditor = () => {
  const NONE = 'NONE';
  const EXECUTION = 'Execution';
  const ruleEditorId = 'divRuleEditor';

  const emptyRule = {
    id: NONE,
    code: '',
    name: '',
    description: '',
    typeCode: EXECUTION,
    categoryCode: '',
    priority: 1,
    json: '',
    isNew: false,
    isActive: false,
    isErrorSupressable: false,
    editorId: ruleEditorId
  };

  const [ruleList, setRuleList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [processList, setProcessList] = useState([]);
  const [catgeoryList, setCategoryList] = useState([]);

  const [selectedRule, setSelectedRule] = useState({...emptyRule});
  const [selectedProcess, setSelectedProcess] = useState(NONE);
  const [selectedCatgeory, setSelectedCategory] = useState(NONE);

  useEffect(() => {
    axios.get(`${config.services.rules.uri}/processes`)
      .then(response => {
        setProcessList(response.data)
      });
  }, []);

  useEffect(() => {
    axios.get(`${config.services.rules.uri}/editor-modes`)
      .then(response => {
        setTypesList(response.data);
      })
  }, []);

  useEffect(() => {
    axios.get(`${config.services.rules.uri}/categories?processCode=${selectedProcess}`)
      .then(response => {
        setCategoryList(response.data);
      })
  }, [selectedProcess]);

  useEffect(() => {
    axios.get(`${config.services.rules.uri}/rules?categoryCode=${selectedCatgeory}`)
      .then(response => {
        setRuleList(response.data);
      })
  }, [selectedCatgeory]);

  useEffect(() => {
    if (selectedRule.isNew || selectedRule.id !== NONE ) {
      axios.get(`${config.services.rules.uri}/editors/${ruleEditorId}?typeCode=${selectedRule.typeCode}&categoryCode=${selectedRule.categoryCode}`)
        .then(settings => {
          let ruleEditor = window.$rule.Context.getControl(ruleEditorId);
  
          if (ruleEditor != null) {
            ruleEditor.dispose();
          }
  
          window.$rule.Context.clear();
      
          //Initialize the Rule Editor with the editor data (localized strings) from the API settings action.
          ruleEditor = window.$rule.init(settings.data.editorData);
          ruleEditor.clear();
      
          //Load source data describing available elements
          ruleEditor.loadSettings(settings.data.sourceData);

          if (selectedRule.json.length > 0) {
            ruleEditor.loadRule(selectedRule.json);
          }
        })
    }
  }, [selectedRule]);

  const onProcessChangedHandler = (event) => {
    setRuleList([]);
    setSelectedProcess(event.target.value);
  };

  const onCategoryChangeHandler = (event) => {
    setSelectedRule({...emptyRule});
    setSelectedCategory(event.target.value);
  };

  const onRuleChangeHandler = (event) => {
    const rule = ruleList.find(item => item.id === event.target.value);

    if (rule !== undefined) {
      setSelectedRule({...rule});
    }
    else {
      setSelectedRule({...emptyRule});
    }
  };

  const onNewRuleHandler = () => {
    setSelectedRule({
      ...emptyRule,
      isNew: true,
      categoryCode: selectedCatgeory
    });
  };

  const onCheckRuleTypeChange = (event) => {
    setSelectedRule({
      ...selectedRule,
      typeCode: event.target.value
    });
  };

  const onDeleteRuleHandler = () => {
    axios.delete(`${config.services.rules.uri}/rules/${selectedRule.id}`)
    .then(() => {
      const ruleEditor = window.$rule.Context.getControl(ruleEditorId);
      ruleEditor.deleted(selectedRule.id);
      ruleEditor.clear();

      const newList = [...ruleList];
      const index = newList.findIndex(item => item.id === selectedRule.id);
      newList.splice(index, 1);

      setRuleList([...newList]);
      setSelectedRule({...emptyRule});
    })    
  };

  const onSaveRuleHandler = () => {
    let method = 'POST';
    let url = `${config.services.rules.uri}/rules`;
    const ruleEditor = window.$rule.Context.getControl(ruleEditorId);

    if (!selectedRule.isNew) {
      method = 'PUT';
      url = `${url}/${selectedRule.id}`;
    }

    axios({method, url, data : {
      ...selectedRule,
      json: JSON.stringify(ruleEditor.extract())
    }})
      .then(response => {
		    // if (result.isRuleEmpty)
		    // else if (!result.isRuleValid)
		    // this.ruleEditor.loadInvalids(result.clientInvalidData);
        // else
        ruleEditor.saved(response.data.id);

        if (selectedRule.isNew) {
          setRuleList([...ruleList, {
            ...selectedRule,
            id: response.data.id,
            json: response.data.json
          }]);
        }
        else {
          const newList = [...ruleList];
          const index = newList.findIndex(item => item.id === response.data.id);
          newList.splice(index, 1, [{...selectedRule}]);
          setRuleList([...newList]);
        }
      })
  };

  const onCheckRuleUpdateHandler = (event, field) => {
    switch(field) {
      case 'code':
        setSelectedRule({...selectedRule, code: event.target.value});
        break;
      case 'name':
        setSelectedRule({...selectedRule, name: event.target.value});
        break;
      case 'priority':
        setSelectedRule({...selectedRule, priority: event.target.value});
        break;        
      case 'description':
        setSelectedRule({...selectedRule, description: event.target.value});
        break;
      case 'active':
        setSelectedRule({...selectedRule, isActive: event.target.checked});
        break;
      case 'supressable':
        setSelectedRule({...selectedRule, isErrorSupressable: event.target.checked});
        break;
      default:
    }
  };

  const hasRequiredValues = selectedRule.code.length > 0 && selectedRule.name.length > 0;
  const canSave = hasRequiredValues && selectedRule.code.length > 0 && selectedRule.name.length > 0;
  const canDelete = !selectedRule.isNew && selectedRule.id !== NONE;

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <FormGroup>
            <Label htmlFor="ddlProcess" hint={<> (required)</>}>Process</Label>
            <Dropdown id="ddlProcess"
              name="ddlProcess"
              onChange={event => onProcessChangedHandler(event)}>
              <option key="NONE" value="NONE">--</option>
              {
                processList.map(item =>
                  <option key={item.code} value={item.code}>{item.description}</option>
                )
              }
            </Dropdown>
          </FormGroup>
        </div>
        <div className="col">
          <FormGroup>
            <Label htmlFor="ddlCategory" hint={<> (required)</>}>Category</Label>
            <Dropdown id="ddlCategory"
              name="ddlCategory"
              disabled={selectedProcess === NONE}
              onChange={event => onCategoryChangeHandler(event)}>
              <option key="NONE" value="NONE">--</option>
              {
                catgeoryList.map(item =>
                  <option key={item.code} value={item.code}>{item.description}</option>
                )
              }
            </Dropdown>
          </FormGroup>
        </div>
        <div className="col">
          <FormGroup>
            <Label htmlFor="ddlRules" hint={<> (required)</>}>Rules</Label>
            <Dropdown id="ddlRules"
              name="ddlRules"
              value={selectedRule.id}
              disabled={selectedCatgeory === NONE}
              onChange={event => onRuleChangeHandler(event)}>
              <option key="NONE" value="NONE">--</option>
              {
                ruleList.map(item =>
                  <option key={item.id} value={item.id}>{item.name}</option>
                )
              }
            </Dropdown>
          </FormGroup>
        </div>
        <div className="col">
          <div className="align-bottom">
            <Button type="button"
              aria-label="New Rule"
              disabled={selectedCatgeory === NONE}
              onClick={() => onNewRuleHandler()}>+</Button>
            <Button type="button" className="btnSave"
              disabled={!canSave}
              onClick={() => onSaveRuleHandler()}>Save Rule</Button>
            <Button type="button" className="btnDelete"
              disabled={!canDelete}
              onClick={() => onDeleteRuleHandler()}>Delete Rule</Button>              
          </div>
        </div>
      </div>
      { selectedRule.isNew || selectedRule.id !== NONE ?
        <React.Fragment>
          <div className="row">
            <div className="col">
              <FormGroup>
                <Label htmlFor="txtCheckCode" hint={<> (required)</>}>Check Code</Label>
                <TextInput type="text"
                  id="txtCheckCode"
                  name="txtCheckCode"
                  value={selectedRule.code}
                  onChange={event => onCheckRuleUpdateHandler(event, 'code')} />
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup>
                <Label htmlFor="txtCheckName" hint={<> (required)</>}>Check Name</Label>
                <TextInput type="text"
                  id="txtCheckName"
                  name="txtCheckName"
                  value={selectedRule.name}
                  onChange={event => onCheckRuleUpdateHandler(event, 'name')} />
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup>
                <Label htmlFor="ddlRulePriority" hint={<> (required)</>}>Priority</Label>
                <Dropdown
                  id="ddlRulePriority"
                  name="ddlRulePriority"
                  value={selectedRule.priority}
                  onChange={event => onCheckRuleUpdateHandler(event, 'priority')}>
                  {
                    [1,2,3,4,5,6,7,8,9].map(item =>
                      <option key={item} value={item}>{item}</option>
                    )
                  }
                </Dropdown>
              </FormGroup>
            </div>
            <div className="col">
              <div className="align-bottom display-flex">
                <Checkbox className="margin-right-20"
                  id="chkActive"
                  name="chkActive"
                  label="Active?"
                  checked={selectedRule.isActive}
                  onChange={event => onCheckRuleUpdateHandler(event, 'active')} />
                <Checkbox className="margin-right-20"
                  id="chkSupressable"
                  name="chkSupressable"
                  label="Supressable?"
                  checked={selectedRule.isErrorSupressable}
                  onChange={event => onCheckRuleUpdateHandler(event, 'supressable')} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <FormGroup>
                <Label htmlFor="txtCheckDesc" hint={<> (optional)</>}>Description</Label>
                <Textarea
                  id="txtCheckDesc"
                  name="txtCheckDesc"
                  value={selectedRule.description}
                  onChange={event => onCheckRuleUpdateHandler(event, 'description')} />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Label>Rule Editor Modes</Label>
              <Fieldset className="display-flex">
              {
                typesList.map(item =>
                  <Radio className="margin-right-20"
                    id={`ruleType${item.code}`}
                    key={`ruleType${item.code}`}
                    name="check-rule-types"
                    label={item.description}
                    value={item.code}
                    disabled={!selectedRule.isNew && selectedRule.typeCode !== item.code}
                    checked={selectedRule.typeCode === item.code}
                    onChange={(event) => onCheckRuleTypeChange(event)}
                  />
                )
              }
              </Fieldset>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Label>Rule Definition</Label>
              <div id={ruleEditorId} />
            </div>
          </div>
        </React.Fragment>
      : null }
    </div>
  );
}

export default RuleEditor;
