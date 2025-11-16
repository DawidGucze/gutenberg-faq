<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$tables  = $attributes['tables'] ?? [];
$tag = strtolower( $attributes['tag'] ) ?? 'h2';
$heading = $attributes['heading'] ?? '';

$allowed_tags = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div' ];
if ( ! in_array( $tag, $allowed_tags, true ) ) {
    $tag = 'h1';
}

$heading_tag = sprintf(
    '<%1$s class="faq_block_heading">%2$s</%1$s>',
    esc_attr( $tag ),
    $heading
);

?>
<section class="faq_block_section">

    <div class="faq_block_container">

        <?php if (!empty($heading)) : ?>
            <?php echo $heading_tag; ?>
        <?php endif; ?>

        <div class="faq_block_faqs">
            <?php foreach ($tables as $table) : ?>
                <?php if (!empty($table['faqs']) && is_array($table['faqs'])) : ?>
                    <?php
                    $faqs_number = count($table['faqs']);
                    $half = ceil($faqs_number / 2);

                    $faqs_column_1 = array_slice($table['faqs'], 0, $half);
                    $faqs_column_2 = array_slice($table['faqs'], $half);
                    ?>
                    
                    <div class="faq_block_faqs_column">
                        <?php foreach ($faqs_column_1 as $item) : ?>
                            <div class="faq_block_faq">
                                <?php if (!empty($item['question'])) : ?>
                                    <div class="faq_block_faq_question"><?php echo wp_kses_post($item['question']); ?></div>
                                <?php endif; ?>
                                <?php if (!empty($item['answer'])) : ?>
                                    <div class="faq_block_faq_answer_box">
                                        <div class="faq_block_faq_answer"><?php echo wp_kses_post($item['answer']); ?></div>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <div class="faq_block_faqs_column">
                        <?php foreach ($faqs_column_2 as $item) : ?>
                            <div class="faq_block_faq">
                                <?php if (!empty($item['question'])) : ?>
                                    <div class="faq_block_faq_question"><?php echo wp_kses_post($item['question']); ?></div>
                                <?php endif; ?>
                                <?php if (!empty($item['answer'])) : ?>
                                    <div class="faq_block_faq_answer_box">
                                        <div class="faq_block_faq_answer"><?php echo wp_kses_post($item['answer']); ?></div>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>

                <?php endif; ?>
            <?php endforeach; ?>
        </div>

    </div>

</section>
