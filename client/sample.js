import React, {Component} from 'react';

export default class Sample extends Component {
	constructor(props) {
		super(props);
        
        this.state = {
            currentTab: props.currentTab || 'tab1',
            tabs: [
                {
                    value: 'tab1',
                    text: 'Tab 1',
                },
                {
                    value: 'tab2',
                    text: 'Tab 2',
                },
            ],
            values: [],
            fields: {
                tab1: [
                    {
                        type: 'checkbox',
                        label: 'Checkbox',
                        inputs: [
                            {
                                value: 1,
                                text: 'Да',
                            },
                            {
                                value: 0,
                                text: 'Нет',
                            },
                        ],
                    },
                    {
                        type: 'text',
                        label: 'Text',
                    },
                ],
                tab2: [
                    {
                        type: 'radio',
                        label: 'Radio',
                        inputs: [
                            {
                                value: 1,
                                text: 'Да',
                            },
                            {
                                value: 0,
                                text: 'Нет',
                            },
                        ],
                    },
                ],
            },
        };
	}

    componentWillMount() {
        this.generateValues();
    }

    generateValues() {
        const multiple = ['checkbox', 'radio'];
        const keys = Object.keys(this.state.fields);
        const values = {};
        keys.forEach(key => {
            values[key] = this.state.fields[key].map((field, i) => {
                if (field.default) return field.default
                if (multiple.indexOf(field.type) !== -1) return [0];
                return '';
            });
        });
        this.setState({
            values,
        });
    }

	tabClick(currentTab) {
		this.setState({ currentTab });
	}

    inputChange({ e, currentTab, index, value = e.target.value, type = 'text' }) {
        const values = this.state.values;
        if (type === 'checkbox') {
            const valueIndex = values[currentTab][index].indexOf(value);
            if (valueIndex === -1) {
                values[currentTab][index].push(value);
            } else {
                values[currentTab][index].splice(valueIndex, 1);
            } 
        } else if (type === 'radio') {
            values[currentTab][index] = [value];
        } else {
            values[currentTab][index] = value;
        }
        this.setState({
            values,
        });
    }

    render() {
        const multiple = ['checkbox', 'radio'];
        const tabs = this.state.tabs.map((tab, i) => (
            <li
                key={i}
                onClick={() => this.tabClick(tab.value)}
            >{tab.text}</li>
        ));
        const fields = fields => (
            fields.map((field, i) => {
                return (
                    <div key={i}>
                        <label>{field.label}</label>
                        {multiple.indexOf(field.type) !== -1 ? (
                            <div>
                                {field.inputs.map((option, j) => (
                                    <div key={j}>
                                        <label>{option.text}</label>
                                        <input
                                            type={field.type}
                                            value={option.value}
                                            checked={this.state.values[this.state.currentTab][i].indexOf(j) !== -1}
                                            onChange={(e) => this.inputChange({
                                                e,
                                                currentTab: this.state.currentTab,
                                                index: i,
                                                value: j,
                                                type: field.type,
                                            })}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <input
                                type={field.type}
                                value={this.state.values[this.state.currentTab][i]}
                                onChange={(e) => this.inputChange({
                                    e,
                                    currentTab: this.state.currentTab,
                                    index: i,
                                })}
                            />
                        )}
                    </div>
                )
            })
        );
        return (
            <div>
                <ul>
                    {tabs}
                </ul>
                {this.state.currentTab === 'tab1' && (
                    <div>
                        <h1>First tab</h1>
                        {fields(this.state.fields.tab1)}
                    </div>
                )}
                {this.state.currentTab === 'tab2' && (
                    <div>
                        <h1>Second tab</h1>
                        {fields(this.state.fields.tab2)}
                    </div>
                )}
            </div>
        )
    }
}
