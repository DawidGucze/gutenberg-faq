import { useState } from 'react';
import { useBlockProps, RichText, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { Button, ToolbarGroup, ToolbarDropdownMenu, PanelBody, SelectControl } from '@wordpress/components';
import { headingLevel1 as headingLevelIcon } from '@wordpress/icons';

export default function Edit({ attributes, setAttributes, isSelected }) {

    const { tag = 'h2', heading, tables } = attributes;
    const blockProps = useBlockProps();

    const [activeField, setActiveField] = useState(null);

    const tagOptions = [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6', value: 'h6' },
        { label: 'DIV', value: 'div' }
    ];

    const TagName = tag;

    const createId = () =>
        Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    const addListItem = (tableIndex, field) => {
        const newTables = tables.map((t, i) => {
            if (i !== tableIndex) return t;
            const list = Array.isArray(t[field]) ? t[field] : [];
            return {
                ...t,
                [field]: [...list, { id: createId(), question: '', answer: '' }]
            };
        });
        setAttributes({ tables: newTables });
    };

    const updateQuestion = (tableIndex, field, itemId, newText) => {
        const newTables = tables.map((t, i) => {
            if (i !== tableIndex) return t;
            return {
                ...t,
                [field]: t[field].map(item =>
                    item.id === itemId ? { ...item, question: newText } : item
                )
            };
        });
        setAttributes({ tables: newTables });
    };

    const updateAnswer = (tableIndex, field, itemId, newText) => {
        const newTables = tables.map((t, i) => {
            if (i !== tableIndex) return t;
            return {
                ...t,
                [field]: t[field].map(item =>
                    item.id === itemId ? { ...item, answer: newText } : item
                )
            };
        });
        setAttributes({ tables: newTables });
    };

    const removeListItem = (tableIndex, field, itemId) => {
        const newTables = tables.map((t, i) => {
            if (i !== tableIndex) return t;
            return {
                ...t,
                [field]: t[field].filter(item => item.id !== itemId)
            };
        });
        setAttributes({ tables: newTables });
    };

    return (
        <section {...blockProps} className="faq_block_section">

            {isSelected && activeField === 'heading' && (
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={headingLevelIcon}
                            label="Poziom nagłówka"
                            controls={tagOptions.map((option) => ({
                                title: option.label,
                                isActive: tag === option.value,
                                onClick: () => setAttributes({ tag: option.value }),
                            }))}
                        />
                    </ToolbarGroup>
                </BlockControls>
            )}

            {isSelected && activeField === 'heading' && (
                <InspectorControls>
                    <PanelBody title="Nagłówek">
                        <SelectControl
                            label="Poziom nagłówka"
                            value={tag}
                            options={tagOptions}
                            onChange={(value) => setAttributes({ tag: value })}
                        />
                    </PanelBody>
                </InspectorControls>
            )}

            <div className="faq_block_container">
                <RichText
                    tagName={TagName}
                    className="faq_block_heading"
                    value={heading}
                    onChange={(val) => setAttributes({ heading: val })}
                    placeholder="Nagłówek sekcji..."
                    onFocus={() => setActiveField('heading')}
                />
            </div>

            <div className="faq_block_faqs">
                {tables.map((table, index) => (
                    <div className="faq_block_column" key={table.id || index}>

                        <div className="faq_block_faq">
                            {table.faqs.map(item => (
                                <div className="faq_block_faq_content" key={item.id}>

                                    <div className="faq_block_faq_box">
                                        <RichText
                                            tagName="div"
                                            className="faq_block_faq_question"
                                            value={item.question}
                                            onChange={(val) =>
                                                updateQuestion(index, 'faqs', item.id, val)
                                            }
                                            placeholder="Dodaj pytanie..."
                                            allowedFormats={['core/bold', 'core/italic']}
                                            onFocus={() => setActiveField('question')}
                                        />
                                        <RichText
                                            tagName="div"
                                            className="faq_block_faq_answer"
                                            value={item.answer}
                                            onChange={(val) =>
                                                updateAnswer(index, 'faqs', item.id, val)
                                            }
                                            placeholder="Dodaj odpowiedź..."
                                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                            onFocus={() => setActiveField('answer')}
                                        />
                                    </div>
                                    <div className="faq_block_button_box">
                                        <Button
                                            isSmall
                                            variant="secondary"
                                            onClick={() =>
                                                removeListItem(index, 'faqs', item.id)
                                            }
                                            style={{ marginLeft: '5px' }}
                                        >
                                            Usuń
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            isSmall
                            variant="primary"
                            onClick={() => addListItem(index, 'faqs')}
                            style={{ marginTop: '10px' }}
                        >
                            Dodaj kolejne pytanie
                        </Button>

                    </div>
                ))}
            </div>

        </section>
    );
}
